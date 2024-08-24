'use client';

import { useEffect, useState } from 'react';
import { Key } from '@react-types/shared'; // Ensure you import the correct type
import { FiFilePlus } from 'react-icons/fi';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const NewArticlePage = () => {
    const [articleImage, setArticleImage] = useState<File | string>('');
    const [heading, setHeading] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>(''); // Store as a comma-separated string
    const [fetchedCategories, setFetchedCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleSelectionChange = (keys: "all" | Set<Key>) => {
        if (keys === "all") {
            // Handle 'all' case, depending on your logic, maybe select all items?
            setSelectedKeys(fetchedCategories.map((category: any) => category.category));
        } else {
            setSelectedKeys(Array.from(keys) as string[]);
        }
    };
    console.log("FC", fetchedCategories)

    useEffect(() => {
        const id = localStorage.getItem('creator id');
        console.log("id", id)
        setCreatorId(id);
        const getCategories = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/all/content/categories', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFetchedCategories(data?.data?.allCategory || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setFetchedCategories([]);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        getCategories();
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
            setArticleImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        console.log("clicked")
        setLoading(true);

        // Convert comma-separated strings to arrays
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const categoriesArray = selectedValue.split(',').map(category => category.trim()).filter(category => category !== '');

        if (categoriesArray.length <= 0) {
            showToastError('At least one category is required');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('articleImage', articleImage);
        formData.append('heading', heading);
        formData.append('content', content);

        // Append arrays to FormData
        tagsArray.forEach(tag => formData.append('tags[]', tag));
        categoriesArray.forEach(category => formData.append('category[]', category));

        if (!creatorId) {
            showToastError('Creator ID is not available');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${creatorId}/createArticleContent`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                showToastSuccess('Article created successfully!');
                setLoading(false);
                setArticleImage('');
                setHeading('');
                setContent('');
                setTags('');
                setSelectedKeys([]);
            } else {
                showToastError(`Failed to create article: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            showToastError('An error occurred while creating the article.');
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
                            placeholder="Heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.fileInputLabel}>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            {articleImage === '' ? 'Choose an image' : (typeof articleImage === 'string' ? articleImage : articleImage.name)}
                            <FiFilePlus style={styles.icon} />
                        </label>
                    </div>
                </div>

                <div style={styles.textareaContainer}>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                    />
                </div>

                <div style={{ display: "flex", gap: '100px' }}>
                    <div className="form-group">
                        <label>Tags:</label>
                        <input
                            style={{
                                position: 'relative',
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                border: '1px solid gray',
                                borderRadius: '12px',
                                padding: '8px',
                                backgroundColor: 'white',
                            }}
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags separated by commas"
                        />
                    </div>

                    <div className="form-group">
                        <label>Categories:</label>

                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                width: '100%',
                                alignItems: 'center',
                                border: '1px solid gray',
                                borderRadius: '12px',
                                backgroundColor: 'white',
                            }}
                        >
                            <Dropdown style={{ backgroundColor: 'white', border: '1px solid gray' }}>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        style={{
                                            textAlign: 'left',
                                            width: "100%",
                                            border: 'none',
                                            boxShadow: 'none',
                                            padding: 0,
                                        }}
                                    >
                                        {selectedKeys.length > 0 ? Array.from(selectedKeys).join(', ') : 'Select categories'}
                                    </Button>
                                </DropdownTrigger>

                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    style={{ alignSelf: 'center', cursor: 'pointer' }}
                                    variant="flat"
                                    closeOnSelect={false}
                                    disallowEmptySelection
                                    selectionMode="multiple"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={handleSelectionChange}
                                >
                                    {fetchedCategories.map((category: any) => (
                                        <DropdownItem key={category.category}>
                                            {category.category}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>

                </div>

                <button
                    style={{
                        width: "150px",
                        padding: "10px 20px",
                        backgroundColor: "#ff6600",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}
                    onClick={handleSubmit} // Change onSubmit to onClick
                >
                    {!loading ?
                        <div style={{ display: 'flex' }}>Create Article</div> :
                        <Spinner className='' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </button>

            </div >
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
        width: '95%',
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
        width: '50%',
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
    },
    textareaContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        marginBottom: '20px',
        padding: '10px',
        width: '100%',
    },
    textarea: {
        flex: 1,
        height: '150px',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        resize: 'none',
    },
    saveButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '15px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    buttonIcon: {
        marginLeft: '10px',
        fontSize: '1.2rem',
    },
    icon: {
        fontSize: '1.5rem',
        marginLeft: '10px',
    },
};

export default NewArticlePage;
