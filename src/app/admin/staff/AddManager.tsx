'use client';

import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, Image, Spinner } from 'react-bootstrap';
import { Poppins } from 'next/font/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
});

const AddManager = () => {
    const [managerProfile, setManagerProfile] = useState<string | File>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/create/manager', {
                method: 'POST',
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


    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ width: '100%', minHeight: '60vh', backgroundColor: 'transparent' }}
            >
                <div style={{ maxWidth: '800px', width: '100%', borderRadius: '10px', backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <Card className="p-4 shadow-sm" style={{ borderRadius: '10px', fontFamily: poppins.style.fontFamily, backgroundColor: 'transparent' }}>
                        <h1 className="text-center mb-4">Add Manager</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formProfileImage" className="mb-3">
                                <Form.Label>Manager Profile</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="managerProfile"
                                    ref={fileInputRef}                                    

                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                                {profilePreview && (
                                    <div className="text-center mt-3">
                                        <Image
                                            src={profilePreview}
                                            roundedCircle
                                            alt="Manager Profile Preview"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                                <Form.Group controlId="formName" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formUsername" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        name="username"
                                        value={username}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formStates" className="mb-3">
                                <Form.Label>States</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter states"
                                    name="states"
                                    value={states}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCountries" className="mb-3">
                                <Form.Label>Countries</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter countries"
                                    name="countries"
                                    value={countries}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                                <Form.Group controlId="formContactNumber" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter contact number"
                                        name="contact_number"
                                        value={contactNumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="text-center">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{ backgroundColor: '#ff6600', borderColor: '#ff6600' }}
                                    disabled={loading}
                                >
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Add Creator'}
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </Container>
            <ToastContainer />
        </>
    );
};

export default AddManager;
