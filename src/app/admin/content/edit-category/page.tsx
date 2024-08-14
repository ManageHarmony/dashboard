'use client';


import React, { useEffect, useState } from 'react';
import { FiUser, FiFilePlus, FiLoader } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai'; // Importing a new icon for adding contact
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategoryPage: React.FC = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(null);
    const [contentCategoryImage, setContentCategoryImage] = useState<File | string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [initialCategory, setInitialCategory] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialImage, setInitialImage] = useState<File | string>('');
    const [run, setRun] = useState(false);
    useEffect(() => {
        const storedData = sessionStorage.getItem('editCategoryData');
        if (storedData) {
            const { category, description, image_path, id } = JSON.parse(storedData);
            setCategory(category);
            setInitialCategory(category);
            setId(id);
            setDescription(description);
            setInitialDescription(description);
            setContentCategoryImage(image_path);
            setInitialImage(image_path);
            sessionStorage.removeItem('editCategoryData');
        }
    }, [run]);

    const handleImageUpload = (e: any) => {
        setContentCategoryImage(e.target.files[0]);
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

    const hasStateChanged = () => {
        return (
            category !== initialCategory ||
            description !== initialDescription ||
            (typeof contentCategoryImage === 'object' && contentCategoryImage !== initialImage)
        );
    };

    const handleSubmit = async (categoryId: any) => {
        if (!hasStateChanged()) {
            showToastError("No changes detected.");
            return;
        }

        const formData = new FormData();

        if (category !== initialCategory) formData.append("category", category);
        if (description !== initialDescription) formData.append("description", description);
        if (contentCategoryImage && contentCategoryImage !== initialImage) formData.append("contentCategoryImage", contentCategoryImage);
        setLoading(true);
        

        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/update/category/${categoryId}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            showToastSuccess(`Category Updated Successfully`);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setInitialCategory(category);
            setInitialDescription(description);
            setContentCategoryImage(contentCategoryImage);
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
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={styles.input}
                        />
                        <div>
                            <FiUser style={styles.icon} />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={{ marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />

                            {contentCategoryImage === '' ? <div>choose a docx</div> : (typeof contentCategoryImage === 'string' ? contentCategoryImage : contentCategoryImage.name)}
                            <div>
                                <FiFilePlus style={styles.icon} />

                            </div>

                        </label>


                    </div>
                </div>
                <div style={{
                    width: "100%",
                    height: '300px',
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    border: '1px solid #ddd',
                    display: "flex",
                    justifyContent: "space-between",
                    resize: 'none'
                }}>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.input}
                    />
                    <div className='flex-end'>
                        <FiUser style={styles.icon} />
                    </div>
                </div>
                <button style={styles.saveButton} onClick={()=>handleSubmit(id)}>
                    {!loading ?
                        <div style={{ display: 'flex' }}>Save <AiOutlineUserAdd style={{ ...styles.buttonIcon, fontSize: '1.5rem' }} /></div> : <Spinner className='' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </button>

            </div>
            <ToastContainer />
        </>
    );
}

const styles = {

    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        margin: "20px 25px",
        padding: '20px',
        width: '56%',
        // maxWidth: '1200px', // Increase the max-width for the container
        // boxSizing: 'border-box' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: "space-evenly",
        minHeight: '60vh', // Increase the height of the main div
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "40px",
        width: '100%',
        marginBottom: '20px',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '60%', // Each input group takes half of the available width in the row
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
    },
    input: {
        width: '80%', // Leave space for the icon
        padding: '10px 15px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box' as const,
        outline: 'none',
        backgroundColor: 'transparent', // Ensure the input blends with the container
    },


    icon: {
        color: '#ff8a00',
        fontSize: '2rem',
        marginRight: "5px"
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
        alignSelf: 'center', // Center the button
        width: '100px',
        height: '50px'
    },
    buttonIcon: {
        marginLeft: '10px',
        fontSize: "2rem"
    },
};

export default EditCategoryPage;
