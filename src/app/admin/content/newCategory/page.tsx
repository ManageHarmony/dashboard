'use client';
import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import { FiUser, FiFilePlus } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Dropdown, Spinner, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoSaveOutline } from 'react-icons/io5';

const NewCategoryPage: React.FC = () => {
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const [name, setName] = useState("");
    const [assignedManager, setAssignedManager] = useState('');
    const [fetchedManagers, setFetchedManagers] = useState<string[]>([]);
    const [categoryImage, setCategoryImage] = useState<File | string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
            setPicturePreview(URL.createObjectURL(e.target.files[0]));
        }

    };

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

    useEffect(() => {
        const getManager = async () => {
            try {
                const response = await fetch("https://harmony-backend-z69j.onrender.com/api/admin/get/staff", {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const managers = data?.staff?.managers || [];
                const managerNames = managers.map((manager: { username: any; name: any; }) => manager.username || manager.name);
                setFetchedManagers(managerNames);
            } catch (error) {
                console.error("Error getting manager: ", error);
            } finally {
                setLoading(false);
            }
        };
        getManager();
    }, []);

    const handleManagerSelect = (eventKey: string | null) => {
        if (eventKey) {
            setAssignedManager(eventKey);
        }
    };
console.log(assignedManager)
const handleSubmit = async () => {
    const missingFields = [];
    if (!name) missingFields.push('Category');
    if (!assignedManager) missingFields.push('AssignedManager');
    if (!categoryImage) missingFields.push('Image');

    if (missingFields.length > 0) {
        showToastError(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("assignedManager", assignedManager);
    formData.append("categoryImage", categoryImage);

    try {
        const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/create/category', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (!response.ok) {
            setLoading(false);
            return showToastError(result.message);
        }

        setName('');
        setAssignedManager('');
        setCategoryImage('');
        setPicturePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
        showToastSuccess(`${name} has been added as category`);
    } catch (error) {
        console.error("Error:", error);
        showToastError(`Error: ${(error as Error).message || 'Something went wrong'}`);
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Form style={styles.formContainer} className="input-transition">
                    <div style={{ display: "flex", gap: "30px" }}>
                        <Form.Group controlId="categoryImage" className="mb-3" style={{ width: "50%" }}>
                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageUpload}
                                    ref={fileInputRef}
                                    accept="image/*"
                                    style={{ paddingRight: "40px", height: "200px" }}
                                    onFocus={() => handleFocus('categoryPicture')}
                                    onBlur={() => handleBlur('categoryPicture')}
                                />
                                {picturePreview && (
                                    <div className="text-center mt-3" style={{ position: "absolute", left: "50px" }}>
                                        <Image
                                            src={picturePreview}
                                            alt="Category Picture Preview"
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                )}

                                <div style={{ position: "absolute", right: "10px" }}>
                                    <FiFilePlus style={{ fontSize: "30px", color: focusState["categoryPicture"] ? '#2C297E' : '#ff6600', }} />
                                </div>
                            </div>
                        </Form.Group>

                        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                            <Form.Group controlId="categoryName" style={styles.formGroup}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Category Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onFocus={() => handleFocus('name')}
                                        onBlur={() => handleBlur('name')}
                                        className="input-transition"
                                        style={{ paddingRight: "40px", height: "50px" }}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <FiUser style={{ color: focusState["name"] ? '#2C297E' : '#ff6600', fontSize: "30px", }} />
                                    </div>
                                </div>

                            </Form.Group>



                            <Form.Group controlId="assignedManager">
                                <Dropdown onSelect={handleManagerSelect}>
                                    <Dropdown.Toggle variant="outline-secondary" className="w-100 text-left">
                                        {assignedManager || 'Select a manager'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {fetchedManagers.length > 0 ? (
                                            fetchedManagers.map((manager, index) => (
                                                <Dropdown.Item key={index} eventKey={manager}>
                                                    {manager}
                                                </Dropdown.Item>
                                            ))
                                        ) : (
                                            <Dropdown.Item disabled>No managers available</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>

                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <Button variant="primary" style={styles.saveButton} onClick={handleSubmit}>
                        {!loading ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>Save <IoSaveOutline style={styles.buttonIcon} /></div>
                        ) : (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </Button>
                    </div>
                </Form>
                <ToastContainer />
            </div>
        </>
    );
}

const styles = {
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        margin: "20px 25px",
        padding: '20px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: "space-evenly",
        minHeight: '60vh',
    },
    formGroup: {
        width: '100%',
        marginBottom: '20px',
    },

    saveButton: {
        backgroundColor: '#ff6600',
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',      
        fontSize: '1rem',
        width: '100px',
        height: '50px'
    },
    buttonIcon: {
        marginLeft: '10px',
        fontSize: "1.5rem"
    },
};

export default NewCategoryPage;
