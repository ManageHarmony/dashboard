'use client'
import React, { useEffect, useState } from 'react'
import { Card, Button } from "@nextui-org/react";
import Link from 'next/link';
import ArticleCard from '../../ArticleCard';
import { Spinner } from 'react-bootstrap';

const AllArticlePage = () => {
    const [articleData, setArticleData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'publish', 'unpublish', 'rejected'

    useEffect(() => {
        const userId = localStorage.getItem("creator id");

        const fetchData = async () => {
            try {
                const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${userId}/getAllContent`, {
                    method: 'GET'
                });
                const data = await response.json();
                console.log(data)
                console.log(data?.article_content)                
                setArticleData(data?.article_content);
                setFilteredData(data?.article_content);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchData();
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
                    
                    <Link href={`/admin/content/allArticles/${data?.id}`} key={index} className="col-md-4 mb-4">
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
