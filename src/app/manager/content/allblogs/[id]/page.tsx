'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';

const BlogPost = () => {
   
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing.');
        }
        
    const handleChange = async (event: any) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value);

        const url = `https://harmony-backend-z69j.onrender.com/api/blog/action/${blog?.blog_creatorId}/${id}?action=${encodeURIComponent(value)}`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error('API key is missing.');
        }
        try {
            const response = await fetch(url, {
                method: 'PUT',headers:{'x-api-key':apiKey}
                // or 'GET', 'POST', etc., depending on your API's requirement

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        console.log('Router ID:', id);

        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/get/blog/${id}`, {
                        method: "GET",
                        headers: { 'x-api-key': apiKey }
                    });
                    const { data } = await response.json();
                    console.log("data verified--->", data?.verified);
                    setBlog(data);
                    setSelectedOption(data?.verified || '');
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching blog data:', error);
                    setLoading(false);
                }
            };

            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mx-2">Loading..</h4>
            </div>

        </>
             
        )
    }

    if (!blog) {
        return <div>Blog not found.</div>;
    }

    return (
        <div className='d-flex justify-between'>
            <div className='each-blog'>
                <div className="imageContainer d-flex align-items-center justify-center mb-4" style={{ border: "0.5px solid rgba(0,0,0,0.4)", borderRadius: '10px' }}>
                    <Image
                        src={blog.data.images[0] ? blog.data.images[0] : "/public/assests/avatar.jpg"}
                        alt="Blog Image"
                        width={300}
                        height={200}
                        objectFit="cover"
                    />
                </div>
                <div style={{ fontSize: '24px' }}>{blog?.data?.headings?.h1[0]}</div>
                <div style={{ fontSize: '18px' }}>{blog?.data?.headings?.h1[1]}</div>

                <p style={{
                    textAlign: 'justify',
                    marginTop: 10,
                    lineHeight: '1.6'
                }}>{blog?.data?.paragraphs?.join(' ')}
                </p>
            </div>
            <div className="blog-status">
                <select
                    id="options"
                    name="options"
                    className="status-dropdown"
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="pending" disabled>{selectedOption ? selectedOption.toUpperCase() : 'PENDING: Set Status'}</option>
                    <option value="publish">PUBLISH</option>
                    <option value="unpublish">UNPUBLISH</option>
                    <option value="rejected">REJECTED</option>
                    {/* improvement has to be added */}
                </select>
            </div>
        </div>
    );
};

export default BlogPost;
