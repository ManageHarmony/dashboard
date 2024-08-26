'use client';

import React, { useState } from 'react';
import { Container, Form, Button, Card, Image, Spinner } from 'react-bootstrap';
import { Poppins } from 'next/font/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
});

const AddCreator = () => {
    const [creatorPicture, setCreatorPicture] = useState<string | File>('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [state, setState] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [password, setPassword] = useState('');
    const [assignedManager, setAssignedManager] = useState('');
    const [loading, setLoading] = useState(false);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);

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
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'country') setCountry(value);
        if (name === 'contact_number') setContactNumber(value);
        if (name === 'state') setState(value);
        if (name === 'password') setPassword(value);
        if (name === 'assignedManager') setAssignedManager(value);
    };

    const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLanguages(value.split(',').map(language => language.trim()).filter(language => language !== ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !email || !country || !contactNumber || !state || !password || !assignedManager) {
            showToastError('All fields are required');
            setLoading(false);
            return;
        }

        if (languages.length === 0) {
            showToastError('At least one language is required');
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

        languages.forEach(language => formData.append('languages[]', language));

        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/creatorProfile', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
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
                setLanguages([]);
                setPicturePreview(null);
            } else {
                showToastError(`Failed to add creator: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while adding the creator.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ width: '100%', minHeight: '60vh', backgroundColor: '#daf7fd7e' }}
            >
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <Card className="p-4 shadow-sm" style={{ borderRadius: '10px', fontFamily: poppins.style.fontFamily }}>
                        <h1 className="text-center mb-4">Add Creator</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCreatorPicture" className="mb-3">
                                <Form.Label>Creator Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="creatorPicture"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                                {picturePreview && (
                                    <div className="text-center mt-3">
                                        <Image
                                            src={picturePreview}
                                            roundedCircle
                                            alt="Creator Picture Preview"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </Form.Group>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
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
                                <Form.Group controlId="formEmail" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                                <Form.Group controlId="formCountry" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter country"
                                        name="country"
                                        value={country}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formState" className="mb-3" style={{ width: "100%" }}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter state"
                                        name="state"
                                        value={state}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group controlId="formLanguages" className="mb-3">
                                <Form.Label>Languages</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter languages"
                                    onChange={handleLanguagesChange}
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
                            <Form.Group controlId="formAssignedManager" className="mb-3">
                                <Form.Label>Assigned Manager</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter assigned manager"
                                    name="assignedManager"
                                    value={assignedManager}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ backgroundColor: '#ff6600', borderColor: '#ff6600' }}
                                disabled={loading}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Add Creator'}
                            </Button>
                        </Form>
                    </Card>
                </div>
            </Container>
            <ToastContainer
                position="top-center"
                style={{ top: '10px' }} // Adjust position as needed
            />
        </>
    );
};

export default AddCreator;
