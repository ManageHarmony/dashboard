import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [iframePreview, setIframePreview] = useState<string | null>(null);

    useEffect(() => {
        const { youtubeUrl } = formData;

        // Regular expression to extract YouTube video ID from the URL
        const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:embed\/|v\/|v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (videoId) {
            setIframePreview(`https://www.youtube.com/embed/${videoId}`);
        } else {
            setIframePreview(null);
        }
    }, [formData.youtubeUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const isFormValid = () => {
        const { youtubeUrl, heading, content, tags, category } = formData;
        return youtubeUrl && heading && content && tags && category && iframePreview;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            showToastError('All fields are required and YouTube URL must be valid!');
            return;
        }
        
        setLoading(true);

        const userId = localStorage.getItem("creator id");

        if (!userId) {
            showToastError('User ID not found. Please log in again.');
            setLoading(false);
            return;
        }

        const { youtubeUrl, heading, content, tags, category } = formData;

        const iframe = `<iframe width="560" height="315" src="${iframePreview}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

        const dataToSend = {
            iframe,
            heading,
            content,
            tags: tags.split(',').map(tag => tag.trim()),  
            category: category.split(',').map(cat => cat.trim()),  
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
            } else {
                throw new Error('Failed to create YouTube content');
            }
        } catch (error: any) {
            showToastError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '80vh', backgroundColor: '#daf7fd7e', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Form onSubmit={handleSubmit} style={{ backgroundColor: '#daf7fd7e', padding: '20px', borderRadius: '8px', maxWidth: '800px', width: '100%' }}>
            <Form.Group controlId="formYoutubeUrl">
                <Form.Label>YouTube URL</Form.Label>
                <Form.Control
                    type="text"
                    name="youtubeUrl"
                    placeholder="Enter YouTube video URL"
                    value={formData.youtubeUrl}
                    onChange={handleChange}
                />
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

            <Form.Group controlId="formHeading">
                <Form.Label>Heading</Form.Label>
                <Form.Control
                    type="text"
                    name="heading"
                    placeholder="Enter heading"
                    value={formData.heading}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    placeholder="Enter content"
                    rows={3}
                    value={formData.content}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    type="text"
                    name="tags"
                    placeholder="Enter tags (comma separated)"
                    value={formData.tags}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    placeholder="Enter category (comma separated)"
                    value={formData.category}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="text-center mt-3">
                <Button
                    type="submit"
                    variant="primary"
                    style={{ backgroundColor: '#ff6600', borderColor: '#ff6600' }}
                    disabled={loading || !isFormValid()}
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Create YouTube Content'}
                </Button>
            </div>
            <ToastContainer />
        </Form>
        </div>
    );
};

export default CreateYTContent;
