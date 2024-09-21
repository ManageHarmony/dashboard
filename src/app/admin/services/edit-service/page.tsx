'use client';

import { useEffect, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineTitle } from 'react-icons/md';
import { IoPricetagsOutline, IoSaveOutline } from 'react-icons/io5';
import { LuSubtitles } from 'react-icons/lu';
import { TbMessageLanguage } from 'react-icons/tb';
import { GiDuration } from 'react-icons/gi';
import { useRouter } from 'next/router';

const EditService = () => {
    const [serviceImage, setServiceImage] = useState<File | string>('');
    const [serviceId, setServiceId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string>(''); // Store as string
    const [subtitle, setSubtitle] = useState<string>(''); // Store as string
    const [whatWeWillDiscuss, setWhatWeWillDiscuss] = useState<string>(''); // Store as string
    const [benefits, setBenefits] = useState<string>(''); // Store as string
    const [language, setLanguage] = useState<string>(''); // Store as string
    const [duration, setDuration] = useState<number | ''>('');
    const [price, setPrice] = useState<number | ''>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState<string>("");
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }

    const showToastError = (message: string) => {
        toast.error(message, {
            position: 'top-center',
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
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Fetch existing service data from localStorage
    useEffect(() => {
        const fetchServiceData = () => {
            try {
                const serviceData = localStorage.getItem('editService');
                console.log("service data", serviceData)
                if (serviceData) {
                    const service = JSON.parse(serviceData);

                    setServiceId(service.id);
                    setTitle(service.title);
                    setDescription(service.description);
                    setTags(service.tags.join(', '));
                    setSubtitle(service.subtitle.join(', '));
                    setWhatWeWillDiscuss(service.what_we_will_discuss.join(', '));
                    setBenefits(service.benefits.join(', '));
                    setLanguage(service.language);
                    setDuration(service.duration);
                    setPrice(service.price);
                    setCategoryId(service.categoryId);
                    setServiceImage(service.imagePath);

                    localStorage.removeItem('editService');
                }
            } catch (error) {
                console.error('Error fetching service data from localStorage:', error);
            }
        };
        fetchServiceData();
    }, []);
    console.log("categoruiD", categoryId);
    console.log("service Image", serviceImage);
    console.log("service Id", serviceId);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category', {
                    headers: { 'x-api-key': apiKey }
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
        setCategoryId(e.target.value);
    };


    const handleImageUpload = (e: any) => {
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
        if (!language) {
            showToastError('Please specify the language.');
            return;
        }
        if (!duration && duration !== 0) {
            showToastError('Please provide a valid duration.');
            return;
        }
        if (!price && price !== 0) {
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

        // Append form fields
        formData.append('title', title);
        formData.append('serviceImage', serviceImage);
        formData.append('description', description);
        formData.append('language', language);
        formData.append('price', price.toString());
        formData.append('duration', duration.toString());


        // Append arrays to FormData
        tagsArray.forEach(tag => formData.append('tags[]', tag));
        subtitleArray.forEach(sub => formData.append('subtitle[]', sub));
        discussArray.forEach(item => formData.append('what_we_will_discuss[]', item));
        benefitsArray.forEach(benefit => formData.append('benefits[]', benefit));

        formData.forEach((value, key) => {
            console.log(key, value);
        });



        if (!serviceId) {
            showToastError("Invalid service ID.");
            return;
        }

        try {
            const url = `https://harmony-backend-z69j.onrender.com/api/admin/update/service/${serviceId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'x-api-key': apiKey,
                },
                body: formData,
            });

            const result = await response.json();
            // Debugging: Log the response result
            console.log('Response Status:', response.status);
            console.log('Response Result:', result);

            if (!response.ok) {
                const errorMessage = result.message || `Failed updating the service. Status: ${response.status}`;
                console.error('Server Error:', result);
                showToastError(errorMessage); // Add this line
                throw new Error(errorMessage);
            }


            showToastSuccess('Service Updated Successfully!');
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while updating the service.');
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
                            <Form.Group style={{ width: "100%", borderRadius: "10px", }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
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
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    placeholder="Price"
                                    style={{ height: "50px" }}
                                />
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        placeholder="Language (comma separated)"
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
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        placeholder="Duration (in minutes)"
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

export default EditService;
