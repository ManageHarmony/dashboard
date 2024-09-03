'use client'
import React, { useEffect, useState } from 'react'
import BlogCard from '@/app/admin/BlogCard';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';

function AllBlogsPage() {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const id = localStorage.getItem("creator id")
        if (!id) {
            throw new Error("Creator Id Not Found")
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/get/blogs/${id}`, {
                    method: 'GET'
                });
                const data = await response.json();
                console.log("data", data)
                setBlogData(data?.blogData);
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

            <div className='row' style={{ width: "100%", paddingLeft: '60px' }}>
                {blogData?.map((data: any, index: number) => (
                    <Link href={`/creator/content/allblogs/${data?.id}`} key={index} className="col-md-4 mb-4">
                        <BlogCard
                            heading={data?.data.headings.h1[0]}
                            para={data?.data.paragraphs[0].length > 0 ? data?.data.paragraphs[0] : data?.data.paragraphs[1]}
                            image={data?.data.images[0]}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllBlogsPage;
