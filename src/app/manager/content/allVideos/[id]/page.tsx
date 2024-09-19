'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import YouTube from 'react-youtube';

const ArticlePost = () => {
  const { id } = useParams();
  const [ytVideo, setYtVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const extractVideoId = (iframeHtml: string) => {
    const match = iframeHtml.match(/src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"/);
    return match ? match[1] : '';
  };

  const handleChange = async (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);

    const url = `https://harmony-backend-z69j.onrender.com/api/yt/action/${ytVideo.yt_creatorId}/${id}?action=${encodeURIComponent(value)}`;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }
    try {
      const response = await fetch(url, { method: 'PUT',headers:{'x-api-key':apiKey}
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
    if (id) {
      const fetchVideo = async () => {
        try {
          const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/get/yt/${id}`);
          const data = await response.json();
          console.log("data", data)
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="mx-2">Loading..</h4>
      </div>
    );
  }

  if (!ytVideo) {
    return <div>Video not found.</div>;
  }

  const videoId = extractVideoId(ytVideo.iframe);

  return (
    <div className='d-flex justify-content-around p-4'>
      <div className='videoCard' style={{ backgroundColor: "#fff", width: '560px', border: "0.5px solid rgba(11, 11, 11, 0.3)", borderRadius: "10px", marginBottom: '20px' }}>
        <div className='video-container' style={{ position: 'relative', width: '100%', height: '315px', borderRadius: "10px" }}>
          <YouTube videoId={videoId} opts={{ height: '315', width: '560', playerVars: { autoplay: 1 } }} />
        </div>
        <div className="info align-self-center" style={{ marginTop: 10, padding: '10px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 22 }}>
            {ytVideo?.heading || 'Heading...'}
          </h1>
          <p>{ytVideo?.content || 'No content available'}</p>
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
        </select>
      </div>
    </div>
  );
};

export default ArticlePost;
