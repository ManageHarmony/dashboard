'use client';

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
    const [heading, setHeading] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [categories, setCategories] = useState<string>('');
    const [blogImage, setBlogImage] = useState<File | null>(null);
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
        e.preventDefault();

        // Convert comma-separated strings to arrays
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const categoriesArray = categories.split(',').map(category => category.trim()).filter(category => category !== '');

        // Create a FormData object
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('content', content);
        

        if (blogImage) {
            formData.append('blogImage', blogImage);
        }

        // Append tags and categories as arrays
        tagsArray.forEach(tag => formData.append('tags[]', tag));
        categoriesArray.forEach(category => formData.append('categories[]', category));

        const id = localStorage.getItem('creator id');

        if (id) {
            console.log("user id: ", id);
        }

        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${id}/createBlogContent`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('Blog posted successfully:', result);

            if (response.ok) {
                showToastSuccess('Service Created Successfully!');
                // Reset form fields after successful submission
                setHeading('');
                setContent('');
                setTags('');
                setCategories('');
                setBlogImage(null);

                // Ensure document is available before using it
                if (typeof document !== 'undefined') {
                    (document.querySelector('input[type="file"]') as HTMLInputElement).value = ''; // Clear file input
                }
            } else {
                showToastError(`Failed to create blog: ${result.message}`);
                const errorText = await response.text();
                console.error('Network response was not ok:', errorText);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error posting blog:', error);
            showToastError('An error occurred while posting the blog');
        }
    };

    // Create a URL for the blog image if available
    const imageUrl = blogImage ? URL.createObjectURL(blogImage) : '';

    return (
        <div className="create-blog">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Heading:</label>
                    <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="Enter the blog heading"
                    />
                </div>

                <div className="form-group">
                    <label>Blog Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setBlogImage(e.target.files[0]);
                            }
                        }}
                    />
                </div>

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

                <button className='blog-button' type="submit">Create Blog</button>
            </form>

            {/* Preview Section */}
            <div className="preview-section">
                <h2>Blog Preview</h2>
                {imageUrl && <img src={imageUrl} alt="Blog Preview" className="preview-image" />}
                <h3>{heading}</h3>
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
