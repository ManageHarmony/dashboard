'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Image, Spinner, Dropdown } from 'react-bootstrap';
import { Poppins } from 'next/font/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiFilePlus, FiUser } from 'react-icons/fi';
import { MdOutlineAttachEmail } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";
import { TbMessageLanguage } from "react-icons/tb";
import { TbPasswordUser } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineUserAdd } from 'react-icons/ai';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
});

const AddCreator = () => {
    const [creatorPicture, setCreatorPicture] = useState<string | File>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [state, setState] = useState('');
    const [languages, setLanguages] = useState<string>();
    const [password, setPassword] = useState('');
    console.log("PASSWORD", password)

    const [assignedManager, setAssignedManager] = useState('');
    const [loading, setLoading] = useState(false);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [fetchedManagers, setFetchedManagers] = useState<string[]>([]);

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
                console.log("data", data?.staff?.managers);

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
            setCreatorPicture(e.target.files[0]);
            setPicturePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'u') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'country') setCountry(value);
        if (name === 'contact_number') setContactNumber(value);
        if (name === 'state') setState(value);
        if (name === 'p') setPassword(value);
        if (name === 'assignedManager') setAssignedManager(value);
        if (name === 'languages') setLanguages(value);
    };


    const validateInputs = () => {
        const emptyFields = [];

        if (!creatorPicture) {
            emptyFields.push('Creator Picture');
        }
        if (!username) {
            emptyFields.push('Username');
        }
        if (!email) {
            emptyFields.push('Email');
        }
        if (!country) {
            emptyFields.push('Country');
        }
        if (!state) {
            emptyFields.push('State');
        }
        if (!contactNumber) {
            emptyFields.push('Contact Number');
        }
        if (languages?.length === 0) {
            emptyFields.push('Languages');
        }
        if (!password) {
            emptyFields.push('Password');
        }
        if (!assignedManager) {
            emptyFields.push('Assigned Manager');
        }

        if (emptyFields.length > 1) {
            showToastError('All fields are required.');
            return false;
        } else if (emptyFields.length === 1) {
            showToastError(`${emptyFields[0]} is required.`);
            return false;
        }

        return true;
    };

    const handleManagerSelect = (eventKey: string | null) => {
        if (eventKey) {
            setAssignedManager(eventKey);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        const formData = new FormData();
        if (creatorPicture) {
            formData.append('creator_picture', creatorPicture);
        }
        formData.append('username', username);
        formData.append('email', email);
        formData.append('country', country);
        formData.append('contact_number', contactNumber);
        formData.append('state', state);
        formData.append('password', password);
        formData.append('assignedManager', assignedManager);
        const languageArray = languages?.split(', ').map(language => language.trim());
        languageArray?.forEach(language => formData.append('language[]', language));

        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/creatorProfile', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                showToastSuccess('Creator added successfully!');
                setCreatorPicture('');
                setUsername('');
                setEmail('');
                setCountry('');
                setContactNumber('');
                setState('');
                setPassword('');
                setAssignedManager('');
                setLanguages('');
                setPicturePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                showToastError("Something went wrong");
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while adding the creator.');
        } finally {
            setLoading(false);
            setPassword('');

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
                <Card className="p-4 shadow-sm" style={{ width: "100%", borderRadius: '10px', fontFamily: poppins.style.fontFamily, backgroundColor: "#fff" }}>
                    <h1 className="text-center fs-2 mb-4" style={{ color: "#ff6600" }}>Add Creator</h1>
                    <Form onSubmit={handleSubmit} className="input-transition">
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group controlId="formCreatorPicture" className="mb-3" style={{ width: "50%" }}>

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="file"
                                        name="creatorPicture"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        style={{ paddingRight: "40px", height: "180px" }}
                                        onFocus={() => handleFocus('creatorPicture')}
                                        onBlur={() => handleBlur('creatorPicture')}
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
                                        <FiFilePlus  style={{ fontSize: "30px", color: focusState["creatorPicture"] ? 'purple' : '#ff6600', }} />
                                    </div>
                                </div>



                            </Form.Group>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "50%" }}>
                                <Form.Group controlId="formUsername" className="mb-3" style={{ width: "100%" }}>

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            name="u"
                                            value={username}
                                            onChange={handleChange}
                                           onFocus={() => handleFocus('username')}
                                           onBlur={() => handleBlur('username')}
                                            className="input-transition"
                                            style={{ paddingRight: "40px", height: "50px" }}
                                        />
                                        <div  style={{ position: "absolute", right: "10px" }}>
                                            <FiUser style={{ color: focusState["username"] ? 'purple' : '#ff6600', fontSize: "30px", }} />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3" style={{ width: "100%" }}>

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className="input-transition"
                                            onFocus={() => handleFocus('email')}
                                            onBlur={() => handleBlur('email')}
                                            style={{ paddingRight: "40px", height: "50px" }}
                                        />
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <MdOutlineAttachEmail  style={{ fontSize: "30px", color: focusState["email"] ? 'purple' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId="formCountry" className="mb-3" style={{ width: "100%" }}>

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter country"
                                            name="country"
                                            value={country}
                                            onChange={handleChange}
                                            className="input-transition"
                                            onFocus={() => handleFocus('country')}
                                            onBlur={() => handleBlur('country')}
                                            style={{ paddingRight: "40px", height: "50px" }}
                                        />
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <BsGlobe2  style={{ fontSize: "30px",color: focusState["country"] ? 'purple' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>

                            <Form.Group controlId="formState" className="mb-3" style={{ width: "100%" }}>

                                <Form.Control
                                    type="text"
                                    placeholder="Enter state"
                                    name="state"
                                    value={state}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('state')}
                                    onBlur={() => handleBlur('state')}
                                    style={{ paddingRight: "40px", height: "50px" }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLanguages" className="mb-3" style={{ width: "100%" }}>

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter languages (comma-separated)"
                                        name="languages"
                                        value={languages}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('languages')}
                                        onBlur={() => handleBlur('languages')}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <TbMessageLanguage style={{ fontSize: "30px", color: focusState["languages"] ? 'purple' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>

                            <Form.Group controlId="formContactNumber" className="mb-3" style={{ width: "100%" }}>

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter contact number"
                                        name="contact_number"
                                        value={contactNumber}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('contact_number')}
                                    onBlur={() => handleBlur('contact_number')}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <FaMobileAlt  style={{ fontSize: "30px",color: focusState["contact_number"] ? 'purple' : '#ff6600',}} />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3" style={{ width: "100%" }}>

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        name="p"
                                        value={password}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <TbPasswordUser style={{ fontSize: "30px", color: focusState["password"] ? 'purple' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ display: "flex", justifyContent: "", gap: "20px" }}>

                            <Form.Group controlId="formAssignedManager" className="mb-3" style={{ width: "50%" }}>
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
                                    <div style={{ position: "absolute", right: "20px" }}>
                                        <FiUser  style={{ fontSize: "30px", color: focusState["creatorPicture"] ? 'purple' : '#ff6600', }} />
                                    </div>
                                </Dropdown>

                            </Form.Group>
                            <div className="d-flex justify-content-center items-center" style={{ width: "200px" }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{ backgroundColor: '#ff6600', borderColor: '#ff6600', display: "flex", height: "50px", alignItems: "center" }}
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Add Creator'}
                                    <AiOutlineUserAdd style={{ fontSize: '1.5rem', marginLeft: "5px" }} />
                                </Button>
                            </div>
                        </div>

                    </Form>
                </Card>
                <ToastContainer />
            </div>
        </>
    );
};

export default AddCreator;
