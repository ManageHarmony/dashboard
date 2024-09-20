'use client'
import React, { useEffect, useState } from 'react'
import { Card, Button } from "@nextui-org/react";
import Link from 'next/link';
import ArticleCard from '@/app/admin/ArticleCard';
import { Spinner } from 'react-bootstrap';

// Function to decode base64 URL encoded strings
const base64UrlDecode = (str: any) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    return atob(base64);
  };

const AllArticlePage = () => {
    const [articleData, setArticleData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'publish', 'unpublish', 'rejected'
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }
    

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
    
              const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/manager/get/content?managerUsername=${managerUsername}`, {
                method: "GET",
                headers: { 'x-api-key': apiKey }
            });
              const data = await response.json();
              console.log("data", data);
    
              if (response.ok) {
                setArticleData(data?.msg?.allArticle);
                setFilteredData(data?.msg?.allArticle);
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
        filterArticles();
    }, [filter, articleData]);


    const filterArticles = () => {
        if (filter === 'all') {
            setFilteredData(articleData);
        } else {
            const filtered = articleData.filter((data: any) => data?.verified === filter);
            setFilteredData(filtered);
        }
    };

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

            <div className='row' style={{ width: "100%", paddingLeft:'60px' }}>
                {filteredData?.map((data: any, index: number) => (
                    
                    <Link href={`/manager/content/allArticles/${data?.id}`} key={index} className="col-md-4 mb-4">
                        <ArticleCard 
                            heading={data?.heading} 
                            para={data?.content} 
                            image={data?.articleImagePath[0]} 
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllArticlePage;
