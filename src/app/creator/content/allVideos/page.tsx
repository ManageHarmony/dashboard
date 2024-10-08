'use client'

import VideoCard from '@/app/admin/VideoCard';
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import { Spinner } from 'react-bootstrap';

interface VideoContent {
    id: any;
    iframe: string;
    heading: string;
    content: string;
}

const VideoContentList: React.FC = () => {
    const [videoContents, setVideoContents] = useState<VideoContent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }

    useEffect(() => {
        setLoading(true)
        const userId = localStorage.getItem("creator_id");

        const fetchVideoContents = async () => {
            try {
                if (!userId) {
                    throw new Error('User ID not found.');
                }

                const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${userId}/getAllContent`, {
                    method: "GET",headers:{'x-api-key':apiKey}
          
                  });
                if (!response.ok) {
                    throw new Error('Failed to fetch video content');
                }
                const data = await response.json();
                console.log("data", data)
                setVideoContents(data.yt_contents || []); 
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoContents();
    }, []);

    if (error) return <div className='d-flex items-center justify-content-center vh-100'>Error: {error}</div>;

    if (loading) {
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4 className="mx-2">Loading..</h4>
        </div>
    </>
    }



    return (
        <div className='video-content-list' style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            padding: "30px",
            gap: "30px"
        }}>
            {videoContents.length > 0 ? (
                videoContents.map((content, index) => (
                    <Link href={`/creator/content/allVideos/${content?.id}`} key={index}>
                      <VideoCard
                        key={index}
                        iframe={content.iframe}
                        heading={content.heading}
                        content={content.content}
                    />
                    </Link>
                ))
            ) : (
                <div>No video content available</div>
            )}
        </div>
    );
};

export default VideoContentList;
