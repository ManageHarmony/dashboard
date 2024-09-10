'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { Form, Button, Spinner, Dropdown, Card } from 'react-bootstrap';
import { FaLink, FaYoutube } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidBookContent } from "react-icons/bi";
import { LuHeading, LuTags } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from 'react-icons/md';

interface FormData {
    youtubeUrl: string;
    heading: string;
    content: string;
    tags: string;
    category: string;
}

const CreateYTContent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        youtubeUrl: '',
        heading: '',
        content: '',
        tags: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [iframePreview, setIframePreview] = useState<string | null>(null);
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});

    const selectedValue = useMemo(() => Array.from(selectedKeys).join(", ").replace("_", " "), [selectedKeys]);

    const handleChangeCategory = (category: string) => {
        setSelectedKeys(prev =>
            prev.includes(category)
                ? prev.filter(key => key !== category)
                : [...prev, category]
        );
    };

    useEffect(() => {
        const { youtubeUrl } = formData;
        const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:embed\/|v\/|v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (videoId) {
            setIframePreview(`https://www.youtube.com/embed/${videoId}`);
        } else {
            setIframePreview(null);
        }
    }, [formData.youtubeUrl]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await fetch("https://harmony-backend-z69j.onrender.com/api/get/all/category");
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFetchedCategories(data?.msg?.allCategory || []);
            } catch (error) {
                console.error('Error getting Category:', error);
            } finally {
                setLoading(false);
            }
        };
        getCategory();
    }, []);

    const showToastError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
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
        });
    };

    const isFormValid = () => {
        const { youtubeUrl, heading, content, tags } = formData;
        return youtubeUrl && heading && content && tags && selectedKeys.length > 0 && iframePreview;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { youtubeUrl, heading, content, tags } = formData;

        // Validate YouTube URL
        const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:embed\/|v\/|v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) {
            showToastError('Invalid YouTube URL');
            return;
        }

        // Validate Heading
        if (!heading) {
            showToastError('Heading is required');
            return;
        }

        // Validate Content
        if (!content) {
            showToastError('Content is required');
            return;
        }

        // Validate Tags
        if (!tags) {
            showToastError('Tags are required');
            return;
        }

        // Validate Category
        if (!selectedKeys.length) {
            showToastError('At least one category must be selected');
            return;
        }

        if (!isFormValid()) {
            showToastError('Please fill all the fields correctly.');
            return;
        }

        setLoading(true);

        const userId = localStorage.getItem("creator_id");

        if (!userId) {
            showToastError('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        const iframe = `<iframe width="560" height="315" src="${iframePreview}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

        const dataToSend = {
            iframe,
            heading,
            content,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            category: selectedKeys
        };

        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${userId}/createYtContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                showToastSuccess('YouTube content created successfully!');
                setFormData({
                    youtubeUrl: '',
                    heading: '',
                    content: '',
                    tags: '',
                    category: ''
                });
                setSelectedKeys([]);
            } else {
                throw new Error('Failed to create YouTube content');
            }
        } catch (error: any) {
            showToastError(error.message);
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
        <div style={{ width: "100%", padding: "20px 40px" }}>
            <Card className="p-4 shadow-sm" style={{ width: "100%", borderRadius: '10px', backgroundColor: "#fff" }}>

                <Form onSubmit={handleSubmit} className="input-transition">
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Form.Group controlId="formYoutubeUrl" className="mb-4" style={{ width: "50%" }}>

                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Form.Control
                                    type="text"
                                    name="youtubeUrl"
                                    placeholder="Enter YouTube video URL"
                                    value={formData.youtubeUrl}
                                    onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                                    style={{ paddingRight: "40px", height: "50px" }}
                                    onFocus={() => handleFocus('youtubeUrl')}
                                    onBlur={() => handleBlur('youtubeUrl')}
                                />
                                <div style={{ position: "absolute", right: "10px" }}>
                                    <FaLink style={{ fontSize: "20px", color: focusState["youtubeUrl"] ? 'purple' : '#ff6600', }} />
                                </div>
                            </div>
                        </Form.Group>

                        {iframePreview && (
                            <div style={{ margin: '20px 0' }}>
                                <h5>Preview:</h5>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={iframePreview}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="YouTube Preview"
                                />
                            </div>
                        )}

                        <Form.Group controlId="formHeading" className="mb-4" style={{ width: "50%" }}>

                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Form.Control
                                    type="text"
                                    name="heading"
                                    placeholder="Enter heading"
                                    value={formData.heading}
                                    onChange={e => setFormData({ ...formData, heading: e.target.value })}
                                    style={{ paddingRight: "40px", height: "50px" }}
                                    onFocus={() => handleFocus('heading')}
                                    onBlur={() => handleBlur('heading')}
                                />
                                <div style={{ position: "absolute", right: "10px" }}>
                                    <LuHeading style={{ fontSize: "20px", color: focusState["heading"] ? 'purple' : '#ff6600', }} />
                                </div>
                            </div>
                        </Form.Group>
                    </div>

                    <div style={{ display: "flex", gap: "20px" }}>
                        <Form.Group controlId="formContent" className="mb-4" style={{ width: "50%" }}>

                            <div style={{ position: "relative", display: "flex" }}>
                                <Form.Control
                                    as="textarea"
                                    name="content"
                                    placeholder="Enter content"
                                    rows={3}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    style={{ paddingRight: "40px", height: "200px", boxShadow: "none" }}
                                    className="input-transition"
                                    onFocus={() => handleFocus('content')}
                                    onBlur={() => handleBlur('content')}
                                />
                                <div style={{ position: "absolute", right: "10px", marginTop: "5px" }}>
                                    <BiSolidBookContent style={{ fontSize: "30px", color: focusState["content"] ? 'purple' : '#ff6600', }} />
                                </div>
                            </div>
                        </Form.Group>

                        <div style={{ width: "50%", display: "flex", flexDirection: "column", }}>
                            <Form.Group controlId="formTags" className="mb-4" >

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        name="tags"
                                        placeholder="Enter tags (comma separated)"
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                        onFocus={() => handleFocus('tags')}
                                        onBlur={() => handleBlur('tags')}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <LuTags style={{ fontSize: "30px", color: focusState["tags"] ? 'purple' : '#ff6600', }} />
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
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Create YouTube Content'}
                                    <FaYoutube style={{ fontSize: '1.5rem', marginLeft: "10px" }} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </Form>
            </Card>

        </div>
    );
};

export default CreateYTContent;
