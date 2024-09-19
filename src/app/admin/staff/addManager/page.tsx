'use client';

import React, { useRef, useState } from 'react';
import { Form, Button, Card, Image, Spinner } from 'react-bootstrap';
import { Poppins } from 'next/font/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiFilePlus, FiUser } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { BsGlobe2 } from 'react-icons/bs';
import { TbMessageLanguage, TbPasswordUser } from 'react-icons/tb';
import { FaMobileAlt } from 'react-icons/fa';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
});

const AddManager = () => {
    const [managerProfile, setManagerProfile] = useState<string | File>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [focusState, setFocusState] = useState<{ [key: string]: boolean }>({});
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [states, setStates] = useState('');
    const [countries, setCountries] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

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
            setManagerProfile(e.target.files[0]);
            setProfilePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'contact_number') setContactNumber(value);
        if (name === 'password') setPassword(value);
        if (name === 'states') setStates(value);
        if (name === 'countries') setCountries(value);
    };

    const validateForm = () => {
        const emptyFields: string[] = [];

        if (!managerProfile) emptyFields.push('Manager profile image');
        if (!name) emptyFields.push('Name');
        if (!username) emptyFields.push('Username');
        if (!email) emptyFields.push('Email');
        if (!states) emptyFields.push('States');
        if (!countries) emptyFields.push('Countries');
        if (!contactNumber) emptyFields.push('Contact number');
        if (!password) emptyFields.push('Password');

        if (emptyFields.length > 1) {
            showToastError('All fields are required.');
        } else if (emptyFields.length === 1) {
            showToastError(`${emptyFields[0]} is required.`);
        }

        return emptyFields.length === 0;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const statesArray = states.split(',').map(state => state.trim()).filter(state => state !== '');
        const countriesArray = countries.split(',').map(country => country.trim()).filter(country => country !== '');

        const formData = new FormData();
        if (managerProfile) {
            formData.append('managerProfile', managerProfile);
        }
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('contact_number', contactNumber);
        formData.append('password', password);

        statesArray.forEach(state => formData.append('states[]', state));
        countriesArray.forEach(country => formData.append('countries[]', country));
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing.');
        }
        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/create/manager', {
                method: 'POST',headers:{'x-api-key':apiKey},

                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                showToastSuccess('Manager added successfully!');
                setManagerProfile('');
                setName('');
                setUsername('');
                setEmail('');
                setContactNumber('');
                setPassword('');
                setStates('');
                setCountries('');
                setProfilePreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                showToastError(`Failed to add manager: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while adding the manager.');
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
                <Card className="p-4 shadow-sm" style={{ borderRadius: '10px', fontFamily: poppins.style.fontFamily, backgroundColor: '#fff' }}>
                    <Form onSubmit={handleSubmit} className="input-transition">
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Form.Group controlId="formProfileImage" className="mb-3" style={{ width: "50%" }}>

                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="file"
                                        name="managerPicture"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        style={{ paddingRight: "40px", height: "180px" }}
                                        onFocus={() => handleFocus('managerPicture')}
                                        onBlur={() => handleBlur('managerPicture')}
                                    />
                                    {profilePreview && (
                                        <div className="text-center mt-3" style={{ position: "absolute", left: "50px" }}>
                                            <Image
                                                src={profilePreview}
                                                roundedCircle
                                                alt="Manager Profile Preview"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <FiFilePlus style={{ fontSize: "30px", color: focusState["managerPicture"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "50%" }}>
                                <Form.Group controlId="formName" className="mb-3" style={{ width: "100%" }}>
                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
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
                                <Form.Group controlId="formUsername" className="mb-3" style={{ width: "100%" }}>

                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('username')}
                                            onBlur={() => handleBlur('username')}
                                            className="input-transition"
                                            style={{ paddingRight: "40px", height: "50px" }}
                                        />
                                        <div style={{ position: "absolute", right: "10px" }}>
                                            <FiUser style={{ color: focusState["username"] ? '#2C297E' : '#ff6600', fontSize: "30px", }} />
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
                                            <MdOutlineAttachEmail style={{ fontSize: "30px", color: focusState["email"] ? '#2C297E' : '#ff6600', }} />
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                            <Form.Group controlId="formStates" className="mb-3" style={{ width: "100%" }}>

                                <Form.Control
                                    type="text"
                                    placeholder="Enter states"
                                    name="states"
                                    value={states}
                                    onChange={handleChange}
                                    className="input-transition"
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    style={{ paddingRight: "40px", height: "50px" }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCountries" className="mb-3" style={{ width: "100%" }}>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter countries"
                                        name="countries"
                                        value={countries}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('countries')}
                                        onBlur={() => handleBlur('countries')}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                    />
                                    <div style={{ position: "absolute", right: "10px" }}>
                                        <BsGlobe2 style={{ fontSize: "30px", color: focusState["countries"] ? '#2C297E' : '#ff6600', }} />
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
                                        <FaMobileAlt style={{ fontSize: "30px", color: focusState["contact_number"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3" style={{ width: "100%" }}>

                               <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                               <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                        style={{ paddingRight: "40px", height: "50px" }}
                                />
                                <div style={{ position: "absolute", right: "10px" }}>
                                        <TbPasswordUser style={{ fontSize: "30px", color: focusState["password"] ? '#2C297E' : '#ff6600', }} />
                                    </div>
                               </div>
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-center text-center mt-3">
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ backgroundColor: '#ff6600', borderColor: '#ff6600', display: "flex", }}
                                disabled={loading}
                            >
                                {loading ? <Spinner animation="border"  size="sm" /> : 'Add Manager'}
                                <AiOutlineUserAdd style={{ fontSize: '1.5rem', marginLeft: "5px" }} />
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddManager;
