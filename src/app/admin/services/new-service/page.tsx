'use client';

import { useEffect, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineTitle } from 'react-icons/md';
import { IoPricetagsOutline, IoSaveOutline } from "react-icons/io5";
import { LuSubtitles } from 'react-icons/lu';
import { TbMessageLanguage } from 'react-icons/tb';
import { GiDuration } from "react-icons/gi";

const NewServicePage = () => {
    const [serviceImage, setServiceImage] = useState<File | string>('');
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string>(''); // Store as string
    const [subtitle, setSubtitle] = useState<string>(''); // Store as string
    const [whatWeWillDiscuss, setWhatWeWillDiscuss] = useState<string>(''); // Store as string
    const [benefits, setBenefits] = useState<string>(''); // Store as string
    const [languages, setLanguages] = useState<string>(''); // Store as string
    const [duration, setDuration] = useState<number | ''>('');
    const [price, setPrice] = useState<number | ''>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category',{
                    headers:{'x-api-key':apiKey}
                });
                const data = await response.json();

                // Access the array of categories inside 'msg.allCategory'
                setCategories(data.msg.allCategory);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    const handleCategoryChange = (e: any) => {
        setCategoryId(e.target.value); // Set the categoryId when user selects a category
    };
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
            setServiceImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryId) {
            showToastError('Please select a category.');
            return;
        }
        if (!title) {
            showToastError('Please provide a title.');
            return;
        }
        if (!description) {
            showToastError('Please provide a description.');
            return;
        }
        if (!tags) {
            showToastError('Please provide tags.');
            return;
        }
        if (!subtitle) {
            showToastError('Please provide a subtitle.');
            return;
        }
        if (!benefits) {
            showToastError('Please provide benefits.');
            return;
        }
        if (!languages) {
            showToastError('Please specify the languages.');
            return;
        }
        if (typeof duration !== 'number' || duration <= 0) {
            showToastError('Please provide a valid duration.');
            return;
        }
        if (typeof price !== 'number' || price <= 0) {
            showToastError('Please provide a valid price.');
            return;
        }
        if (!serviceImage) {
            showToastError('Please upload an image for the service.');
            return;
        }
        if (!whatWeWillDiscuss) {
            showToastError('Please specify what will be discussed.');
            return;
        }


        setLoading(true);
        const formData = new FormData();

        // Split the strings into arrays
        const tagsArray = tags.split(',').map(tag => tag.trim());
        const subtitleArray = subtitle.split(',').map(sub => sub.trim());
        const discussArray = whatWeWillDiscuss.split(',').map(item => item.trim());
        const benefitsArray = benefits.split(',').map(benefit => benefit.trim());
        const languagesArray = languages.split(',').map(lang => lang.trim());

        // Append form fields
        formData.append('title', title);
        formData.append('serviceImage', serviceImage);
        formData.append('description', description);
        formData.append('language', languages);

        formData.append('price', price.toString());

        // Append arrays to FormData (converting each array element to string or other accepted format)
        tagsArray.forEach(tag => formData.append('tags[]', tag));
        subtitleArray.forEach(sub => formData.append('subtitle[]', sub));
        discussArray.forEach(item => formData.append('what_we_will_discuss[]', item));
        benefitsArray.forEach(benefit => formData.append('benefits[]', benefit));

        formData.append('duration', duration.toString());
        console.log("FD", formData)
        console.log("CID", categoryId)

        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/create/service/${categoryId}`, {
                method: 'POST',headers:{'x-api-key':apiKey},
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                showToastSuccess('Service Created Successfully!');
                setLoading(false);
                setDescription('');
                setTitle('');
                setTags('');
                setServiceImage('');
                setBenefits('');
                setDuration('');
                setLanguages('');
                setWhatWeWillDiscuss('');
                setPrice('');
                setSubtitle('');
            } else {
                showToastError(`Failed to create service: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while creating the service.');
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
            <div style={{ padding: "10px 30px" }}>
                <div style={{ backgroundColor: "#fff", padding: "20px 20px", borderRadius: "20px" }}>
                    <Form onSubmit={handleSubmit} className="input-transition" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{ height: "50px" }}
                                        onFocus={() => handleFocus('title')}
                                        onBlur={() => handleBlur('title')}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <MdOutlineTitle style={{ fontSize: "30px", color: focusState["title"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group style={{ width: "100%" }}>
                                <Form.Select
                                    value={categoryId}
                                    onChange={handleCategoryChange}
                                    style={{ height: "50px" }}>
                                    <option value="">Select a category</option>
                                    {categories.map((category: any) => (
                                        <option key={category?.id} value={category.id}>
                                            {category?.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group style={{ width: "100%",  borderRadius: "10px", }}>
                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ height: "50px" }}
                                    onFocus={() => handleFocus('servicePicture')}
                                    onBlur={() => handleBlur('servicePicture')}
                                />

                                <div style={{ position: "absolute", right: "10px" }}>
                                    <FiFilePlus style={{ fontSize: "30px", color: focusState["servicePicture"] ? '#2C297E' : '#ff6600', }} />
                                </div>
                            </div>
                            </Form.Group>

                        </div>

                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ height: "180px", boxShadow: "none" }}
                                className="input-transition"
                            />
                        </Form.Group>

                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        value={tags}
                                        placeholder="Tags (comma separated)"
                                        onChange={(e) => setTags(e.target.value)}
                                        style={{ height: "50px" }}
                                        onFocus={() => handleFocus('tag')}
                                        onBlur={() => handleBlur('tag')}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <IoPricetagsOutline style={{ fontSize: "30px", color: focusState["tag"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        value={subtitle}
                                        placeholder="Subtitle (comma separated)"
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        style={{ height: "50px" }}
                                        onFocus={() => handleFocus('subtitle')}
                                        onBlur={() => handleBlur('subtitle')}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <LuSubtitles style={{ fontSize: "30px", color: focusState["subtitle"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>

                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group style={{ width: "100%" }}>
                                <Form.Control
                                    type="text"
                                    value={benefits}
                                    placeholder="Benefits (comma separated)"
                                    onChange={(e) => setBenefits(e.target.value)}
                                    style={{ height: "50px" }}
                                />
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    style={{ height: "50px" }}
                                />
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Languages (comma separated)"
                                        value={languages}
                                        onChange={(e) => setLanguages(e.target.value)}
                                        style={{ height: "50px" }}
                                        onFocus={() => handleFocus('language')}
                                        onBlur={() => handleBlur('language')}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <TbMessageLanguage style={{ fontSize: "30px", color: focusState["language"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>

                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Duration (in minutes)"
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        style={{ height: "50px" }}
                                        onFocus={() => handleFocus('duration')}
                                        onBlur={() => handleBlur('duration')}
                                    />
                                    <div style={{ position: "absolute", right: "30px" }}>
                                        <GiDuration style={{ fontSize: "30px", color: focusState["duration"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <Form.Control
                                    type="text"
                                    value={whatWeWillDiscuss}
                                    placeholder="What We Will Discuss (comma separated)"
                                    onChange={(e) => setWhatWeWillDiscuss(e.target.value)}
                                    style={{ height: "50px" }}
                                />
                            </Form.Group>

                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ backgroundColor: '#ff6600', borderColor: '#ff6600', display: "flex", height: "50px", alignItems: "center" }}
                                disabled={loading}
                            >
                                {loading ? 'Please wait...' : 'Save'}
                                <IoSaveOutline style={{ fontSize: '1.5rem', marginLeft: "5px" }} />
                            </Button>
                        </div>
                    </Form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default NewServicePage;
