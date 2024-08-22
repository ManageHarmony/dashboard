'use client';

import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {

    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [categories, setCategories] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);



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
        console.log("button clicked");
        e.preventDefault();
    
        setLoading(true);
        
        // Convert comma-separated strings to arrays
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const categoriesArray = categories.split(',').map(category => category.trim()).filter(category => category !== '');
    
        // Create a JSON object with the data
        const data = {
            content: content,
            tags: tagsArray,
            categories: categoriesArray
        };
    
        const id = localStorage.getItem('creator id');
    
        if (id) {
            console.log("user id: ", id);
        }
    
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${id}/createBlogContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                showToastSuccess('Service Created Successfully!');
                setContent('');
                setTags('');
                setCategories('');
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
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags separated by commas"
                    />
                </div>

                <div className="form-group">
                    <label>Categories:</label>
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        placeholder="Enter categories separated by commas"
                    />
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
