'use client';


import React, { useState } from 'react';
import { FiUser, FiFilePlus, FiLoader } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai'; // Importing a new icon for adding contact
import { Alert, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategoryPage: React.FC = () => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [contentCategoryImage, setContentCategoryImage] = useState('');
    console.log(contentCategoryImage)
    const [loading, setLoading] = useState<boolean>(false);


    const handleImageUpload = (e: any) => {
        setContentCategoryImage(e.target.files[0]);
    };
    const showToast = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000, // Auto dismiss after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleSubmit = async () => {
        const missingFields = [];
        if (!category) missingFields.push('Category');
        if (!description) missingFields.push('Description');
        if (!contentCategoryImage) missingFields.push('Image');

        if (missingFields.length > 0) {
            showToast(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }
        setLoading(true);
        const formData = new FormData();
        console.log("clicked")
        formData.append("category", category);
        formData.append("description", description);
        formData.append("contentCategoryImage", contentCategoryImage);

        try {
            console.log("entered")
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/create/content/category', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log("result", result);
            const firstWord = result.message.split(' ')[0];


            showToast('Category Created Successfully');

            setCategory('');
            setDescription('');
            setContentCategoryImage('');
            setLoading(false);


        } catch (error) {
            console.error("Error:", error);
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
                        <label style={{ marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%' }} >
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />

                            {contentCategoryImage === '' ? 'Choose a file' : contentCategoryImage?.name}
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
                <button style={styles.saveButton} onClick={handleSubmit}>
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

export default NewCategoryPage;
