'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { Spinner } from 'react-bootstrap';

const ArticlePost = () => {

    const { id } = useParams();
    const [ytVideo, setYtVideo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }

    useEffect(() => {
        console.log('Router ID:', id);

        if (id) {
            const fetchVideo = async () => {
                try {
                    const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/get/yt/${id}`, {
                        method: 'GET',
                        headers: {'x-api-key':apiKey}
                    });
                    const data = await response.json();
                    console.log(data, "data")
                    console.log("data", data?.yt);
                    setYtVideo(data.yt);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching ytVideo data:', error);
                    setLoading(false);
                }
            };

            fetchVideo();
        }
    }, [id]);
    
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${ytVideo?.yt_creatorId}/deleteYt/${id}`, {
                method: "DELETE",headers:{'x-api-key':apiKey}

            });

            if (!response.ok) {
                throw new Error('Failed to delete the article.');
            } else {
                router.push('/creator/content/allVideos');
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        } finally {
            setLoading(false);
        }
    }

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
            <Dropdown>
                    <Dropdown.Toggle
                        as="button"
                        className="text-orange-600 flex items-center border-1 rounded-2 bg-white px-2 py-1"
                    >
                       Action <FontAwesomeIcon icon={faEye} className="w-4 h-4 mx-1" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>

                        <Dropdown.Item className="flex items-center text-sm p-2">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                            Edit

                        </Dropdown.Item>
                        <Dropdown.Item
                            className="flex items-center text-sm p-2"
                            onClick={() => handleDelete(ytVideo?.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default ArticlePost;
