'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';

const ArticlePost = () => {

    const { id } = useParams();
    const [ytVideo, setYtVideo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption);


    const handleChange = async (event: any) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(value, "value");


        const url = `https://harmony-backend-z69j.onrender.com/api/yt/action/${ytVideo.yt_creatorId}/${id}?action=${encodeURIComponent(value)}`;

        try {
            const response = await fetch(url, {
                method: 'PUT', // or 'GET', 'POST', etc., depending on your API's requirement

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
            const fetchVideo = async () => {
                try {
                    const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/get/yt/${id}`);
                    const data = await response.json();
                    console.log(data, "data")
                    console.log("data verified--->", data?.yt?.verified);
                    setYtVideo(data.yt);
                    setSelectedOption(data?.yt?.verified || '');
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching ytVideo data:', error);
                    setLoading(false);
                }
            };

            fetchVideo();
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

    if (!ytVideo) {
        return <div>ytVideo not found.</div>;
    }

    return (
        <div className='d-flex justify-content-around p-4'>
            <div className='videoCard' style={{ backgroundColor: "#fff", width: '560px', border: "0.5px solid rgba(11, 11, 11, 0.3)", borderRadius: "10px", marginBottom: '20px' }}>
                <div className='video-container' style={{ position: 'relative', width: '100%', height: '315px', borderRadius: "10px" }}>
                    <div dangerouslySetInnerHTML={{ __html: ytVideo?.iframe }} />
                </div>
                <div
                    className="info align-self-center"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 10,
                        padding: '10px',
                    }}
                >
                    <h1 style={{ fontSize: 22 }}>
                        {ytVideo?.heading ? ytVideo?.heading : 'Heading...'}
                    </h1>
                    <p style={{
                        textAlign: 'center', marginTop: 10
                    }}>
                        {ytVideo?.content ? (ytVideo?.content) : "No content available"}
                    </p>
                </div>
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

export default ArticlePost;
