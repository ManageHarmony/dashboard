'use client'

import React, { useState, useEffect } from 'react';
import VideoCard from '@/app/admin/VideoCard';
import { Spinner } from 'react-bootstrap';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

interface VideoContent {
    [x: string]: string;
    iframe: string;
    heading: string;
    content: string;
}

// Function to decode base64 URL encoded strings
const base64UrlDecode = (str: any) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return atob(base64);
  };

const VideoContentList: React.FC = () => {
    const [videoContents, setVideoContents] = useState<VideoContent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filteredData, setFilteredData] = useState<VideoContent[]>([]);
    const [filter, setFilter] = useState('all'); // 'all', 'publish', 'unpublish', 'rejected'

    useEffect(() => {
        const fetchContent = async () => {
          setLoading(true);
    
          const token = localStorage.getItem('manager_token');
          console.log("token", token);
    
          if (token) {
            try {
              // Decode the token
              const decodedToken = JSON.parse(base64UrlDecode(token.split('.')[1]));
              const managerUsername = decodedToken.username;
              console.log("manager", managerUsername)
    
              const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/manager/get/content?managerUsername=${managerUsername}`);
              const data = await response.json();
              console.log("data", data);
    
              if (response.ok) {
                setVideoContents(data?.msg?.allYt || []);
                setFilteredData(data?.msg?.allYt || []);
                setLoading(false);
              } else {
                console.error('Failed to fetch content:', data.message);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }
    
          setLoading(false);
        };
    
        fetchContent();
      }, []);

    useEffect(() => {
        filterVideos();
    }, [filter, videoContents]);

    if (error) return <div className='d-flex items-center justify-content-center vh-100'>Error: {error}</div>;

    const filterVideos = () => {
        if (filter === 'all') {
            setFilteredData(videoContents);
        } else {
            const filtered = videoContents.filter((data) => data?.verified === filter);
            setFilteredData(filtered);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mx-2">Loading..</h4>
            </div>
        );
    }

    const getButtonStyle = (currentFilter: string) => {
        return filter === currentFilter ? { backgroundColor: '#0070f3', color: '#fff' } : {};
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Button
                    onClick={() => setFilter('all')}
                    style={getButtonStyle('all')}
                >
                    All
                </Button>
                <Button
                    onClick={() => setFilter('publish')}
                    style={getButtonStyle('publish')}
                >
                    Published
                </Button>
                <Button
                    onClick={() => setFilter('unpublish')}
                    style={getButtonStyle('unpublish')}
                >
                    Unpublished
                </Button>
                <Button
                    onClick={() => setFilter('rejected')}
                    style={getButtonStyle('rejected')}
                >
                    Rejected
                </Button>
            </div>

            <div className='video-content-list' style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                padding: "30px",
                gap: "30px"
            }}>
                {videoContents.length > 0 ? (
                    filteredData.map((content, index) => (
                        <Link href={`/manager/content/allVideos/${content?.id}`} key={index}>
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
        </div>
    );
};

export default VideoContentList;
