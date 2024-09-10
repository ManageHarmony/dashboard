'use client';

import { useEffect, useState } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category');
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

    const handleSubmit = async () => {
        if (!categoryId) {
            showToastError('Please select a category.');
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
                method: 'POST',
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
    return (
        <>
            <div style={styles.formContainer}>


                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <select value={categoryId} onChange={handleCategoryChange} style={{
                            border: 'none',         
                            outline: 'none',        
                            padding: '8px',         
                            backgroundColor: '#f9f9f9', 
                            borderRadius: '4px',     
                            fontSize: '16px',       
                            width: '100%'           
                        }} >
                            <option value="">Select a category</option>
                            {categories.map((category: any) => (
                                <option key={category?.id} value={category.id}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.fileInputLabel}>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            {serviceImage === '' ? 'Choose a file' : (typeof serviceImage === 'string' ? serviceImage : serviceImage.name)}
                            <FiFilePlus style={styles.icon} />
                        </label>
                    </div>
                </div>


                <div style={styles.textareaContainer}>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            value={tags}
                            placeholder="Tags (comma separated)"
                            onChange={(e) => setTags(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            value={subtitle}
                            placeholder="Subtitle (comma separated)"
                            onChange={(e) => setSubtitle(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            value={benefits}
                            placeholder="Benefits (comma separated)"
                            onChange={(e) => setBenefits(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Languages (comma separated)"
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="number"
                            placeholder="Duration (in minutes)"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            value={whatWeWillDiscuss}
                            placeholder="What We Will Discuss (comma separated)"
                            onChange={(e) => setWhatWeWillDiscuss(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                <button style={styles.saveButton} onClick={handleSubmit} disabled={loading}>
                    {!loading ?
                        <div style={{ display: 'flex' }}>Save <AiOutlineUserAdd style={styles.buttonIcon} /></div> :
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </button>
            </div>
            <ToastContainer />
        </>
    );
}
const styles: { [key: string]: React.CSSProperties } = {
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        margin: "20px 25px",
        padding: '20px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-evenly",
        minHeight: '60vh',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "40px",
        width: '100%',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        marginBottom: '20px',
        padding: '0 10px',
        width: '100%',
    },
    fileInputLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
    },
    input: {
        flex: 1,
        padding: '10px 15px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        backgroundColor: 'transparent',
    },
    textareaContainer: {
        width: "100%",
        height: '200px',
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "10px",
        border: '1px solid #ddd',
        marginBottom: "20px"
    },
    textarea: {
        width: '100%',
        height: '100%',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        resize: 'none',
    },
    icon: {
        color: '#ff8a00',
        fontSize: '1.5rem',
    },
    saveButton: {
        backgroundColor: '#ff8a00',
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        marginTop: '20px',
        alignSelf: 'center',
        width: '120px',
        height: '50px',
    },
    buttonIcon: {
        fontSize: '20px',
        marginLeft: '10px',
    },
};

export default NewServicePage;
