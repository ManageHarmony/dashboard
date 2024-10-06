'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Key } from '@react-types/shared';  // Ensure you import the correct type

import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { saveCategory } from '@/app/redux/slices/exampleSlice';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = () => {

    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [fetchedCategories, setFetchedCategories] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const dispatch = useDispatch()
    let selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const categoriesFromRedux = useSelector((state: any) => state.example.savedCategory);
    console.log(categoriesFromRedux)

    const handleSelectionChange = (keys: "all" | Set<Key>) => {
        if (keys === "all") {
            // Handle 'all' case, depending on your logic, maybe select all items?
            setSelectedKeys(fetchedCategories.map((category: any) => category.category));
        } else {
            setSelectedKeys(Array.from(keys) as string[]);
        }
    };
    useEffect(() => {
        const id = localStorage.getItem('creator_Id');
        setCreatorId(id);
    
        // Get categories from Redux instead of making an API call
        console.log("CFR---->",categoriesFromRedux)
        if (categoriesFromRedux.length > 0) {
            setFetchedCategories(categoriesFromRedux);
            console.log("not making API call")
            setLoading(false);
        } else {
            console.log("making api call")
            const getCategories = async () => {
                try {
                    const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category', {
                        method: 'GET',
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setFetchedCategories(data?.msg?.allCategory || []);
                    dispatch(saveCategory(data?.msg?.allCategory))
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
        }
    }, []);
    // useEffect(() => {
    //     // Ensure this code only runs on the client
    //     const id = localStorage.getItem('creator id');
    //     setCreatorId(id);
       
    // }, []);




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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        // Convert comma-separated strings to arrays
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const categoriesArray = selectedValue.split(',').map(category => category.trim()).filter(category => category !== '');
        console.log("categoriesArray", categoriesArray.length)
        if (categoriesArray.length <= 0) {
            console.log('entered')
            showToastError('Atleast One Category Is Required');
            setLoading(false)
            return
        }
        if (content.length <= 0) {
            console.log('entered')
            showToastError('Blog Is Empty');
            setLoading(false)
            return
        }
        // Create a JSON object with the data
        const data = {
            content: content,
            tags: tagsArray,
            category: categoriesArray
        };


        if (!creatorId) {
            showToastError('Creator ID is not available');
            setLoading(false);
            return;
        }
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing.');
        }
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${creatorId}/createBlogContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key':apiKey
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                showToastSuccess('Blog Created Successfully!');
                setContent('');
                setTags('');
                setSelectedKeys([]);
            } else {
                showToastError(`Failed to create blog: ${result.message}`);
                console.error('Network response was not ok:', result.message);
            }
        } catch (error) {
            console.error('Error posting blog:', error);
            showToastError('An error occurred while posting the blog');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="create-blog">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Blog Content:</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog here..."
                    />
                </div>

                <div className="form-group">
                    <label>Tags:</label>
                    <input
                        style={{
                            position: 'relative',
                            display: 'flex',
                            width: '30%',
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
                            width: '30%',
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
                                    <DropdownItem key={category.name}>
                                        {category.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>



                <button className='blog-button' type="submit">
                    {!loading ?
                        <div style={{ display: 'flex' }}>Create Blog</div> : <Spinner className='' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }</button>
            </form>

            {/* Preview Section */}
            <div className="preview-section">
                <h2>Blog Preview</h2>
                <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <ToastContainer />
        </div>
    );
};

// Quill modules to include in the editor
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
    ],
};

// Quill formats to include in the editor
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'align',
    'color',
    'background',
];

export default CreateBlog;
