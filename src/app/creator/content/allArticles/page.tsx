'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ArticleCard from '@/app/admin/ArticleCard';
import { Spinner } from 'react-bootstrap';

const AllArticlePage = () => {
    const [articleData, setArticleData] = useState([]);
    const [loading, setLoading] = useState(true);
   
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
                setLoading(false);

            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


   

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

    

    return (
        <div style={{ padding: '20px' }}>
            
            <div className='row' style={{ width: "100%", paddingLeft:'60px' }}>
                {articleData?.map((data: any, index: number) => (
                    
                    <Link href={`/creator/content/allArticles/${data?.id}`} key={index} className="col-md-4 mb-4">
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
