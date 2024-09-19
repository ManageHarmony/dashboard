'use client';

import { useEffect, useState } from 'react';
import { Key } from '@react-types/shared'; // Ensure you import the correct type
import { FiFilePlus } from 'react-icons/fi';
import { Spinner, Form, Button, Image, Card, Dropdown} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { MdOutlineArticle, MdOutlineCreateNewFolder } from 'react-icons/md';
import { LuHeading, LuTags } from 'react-icons/lu';
import { BiSolidBookContent } from 'react-icons/bi';

const NewArticlePage = () => {
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const [articleImage, setArticleImage] = useState<File | string>('');
    const [heading, setHeading] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>(''); // Store as a comma-separated string
    const [fetchedCategories, setFetchedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );


    const handleChangeCategory = (category: string) => {
        setSelectedKeys(prev =>
            prev.includes(category)
                ? prev.filter(key => key !== category)
                : [...prev, category]
        );
    };

    useEffect(() => {
        const id = localStorage.getItem('creator_id');
        setCreatorId(id);
        const getCategories = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("data", data)
                setFetchedCategories(data?.msg?.allCategory || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setFetchedCategories([]);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    const showToastError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showToastSuccess = (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArticleImage(e.target.files[0]);
            setPicturePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Convert comma-separated strings to arrays
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const categoriesArray = selectedValue.split(',').map(category => category.trim()).filter(category => category !== '');

        if (categoriesArray.length <= 0) {
            showToastError('At least one category is required');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('articleImage', articleImage);
        formData.append('heading', heading);
        formData.append('content', content);

        // Append arrays to FormData
        tagsArray.forEach(tag => formData.append('tags[]', tag));
        categoriesArray.forEach(category => formData.append('category[]', category));

        if (!creatorId) {
            showToastError('Creator ID is not available');
            setLoading(false);
            return;
        }
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing.');
        }
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${creatorId}/createArticleContent`, {
                method: 'POST',headers:{'x-api-key':apiKey},

                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                showToastSuccess('Article created successfully!');
                setArticleImage('');
                setHeading('');
                setContent('');
                setTags('');
                setSelectedKeys([]);
            } else {
                showToastError(`Failed to create article: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while creating the article.');
        } finally {
            setLoading(false);
        }
    };

    const handleFocus = (field: string) => {
        setFocusState(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: string) => {
        setFocusState(prev => ({ ...prev, [field]: false }));
    };

    return (
        <>
            <div style={{ width: "100%", padding: "20px 40px" }}>
                <Card className="p-4 shadow-sm" style={{ width: "100%", borderRadius: '10px', backgroundColor: "#fff" }}>
                    <Form onSubmit={handleSubmit} className="input-transition">
                        <div style={{ display: "flex", gap: "30px" }}>
                            <div style={{ width: "50%", display: "flex", flexDirection: "column", }}>
                                <Form.Group controlId="formHeading" className="mb-4"  >
                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Heading"
                                            value={heading}
                                            onChange={(e) => setHeading(e.target.value)}
                                            style={{ paddingRight: "40px", height: "50px" }}
                                            onFocus={() => handleFocus('heading')}
                                            onBlur={() => handleBlur('heading')}
                                        />
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <LuHeading style={{ fontSize: "20px", color: focusState["heading"] ? '#2C297E' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-4" >

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="file"
                                            onChange={handleImageUpload}
                                            style={{ paddingRight: "40px", height: "200px" }}
                                            onFocus={() => handleFocus('file')}
                                            onBlur={() => handleBlur('file')}
                                        />
                                        {picturePreview && (
                                            <div className="text-center mt-3" style={{ position: "absolute", left: "50px" }}>
                                                <Image
                                                    src={picturePreview}
                                                    roundedCircle
                                                    alt="Creator Picture Preview"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <FiFilePlus style={{ fontSize: "30px", color: focusState["file"] ? '#2C297E' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formTags" className="mb-4" >

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            placeholder="Enter tags separated by commas"
                                            style={{ paddingRight: "40px", height: "50px" }}
                                            onFocus={() => handleFocus('tags')}
                                            onBlur={() => handleBlur('tags')}
                                        />
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <LuTags style={{ fontSize: "30px", color: focusState["tags"] ? '#2C297E' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                                <Form.Group controlId="formContent" className="mb-4" >
                                    <div style={{ position: "relative", display: "flex" }}>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            style={{ paddingRight: "40px", height: "275px", boxShadow: "none" }}
                                            className="input-transition"
                                            onFocus={() => handleFocus('content')}
                                            onBlur={() => handleBlur('content')}
                                        />
                                        <div style={{ position: "absolute", right: "10px", marginTop: "5px" }}>
                                            <BiSolidBookContent style={{ fontSize: "30px", color: focusState["content"] ? '#2C297E' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="formCategory">

                                <Dropdown style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        {selectedKeys.length > 0 ? selectedKeys.join(', ') : 'Select categories'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {fetchedCategories.map((category: any) => (
                                            <Dropdown.Item
                                                key={category.name}
                                                onClick={() => handleChangeCategory(category.name)}
                                                active={selectedKeys.includes(category.name)}
                                            >
                                                {category.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                                <div className="text-center mt-3" style={{ display: "flex", justifyContent: "flex-end", marginRight: "50px" }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        style={{ backgroundColor: '#ff6600', borderColor: '#ff6600', display: "flex", height: "50px", alignItems: "center" }}
                                    // disabled={loading || !isFormValid()}
                                    >
                                        {loading ? <Spinner animation="border"  size="sm" /> : 'Create Article'}
                                        <MdOutlineArticle style={{ fontSize: '1.5rem', marginLeft: "10px" }} />
                                    </Button>
                                </div>
                            </div>
                        </div>


                    </Form>

                </Card>

            </div>

            <ToastContainer />
        </>
    );
}

export default NewArticlePage;
