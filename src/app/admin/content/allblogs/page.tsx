'use client'
import React, { useEffect, useState } from 'react'
import BlogCard from '../../BlogCard'
import { Card, Button } from "@nextui-org/react";
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';

function Page() {
    const [allBlog, setAllBlog] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'publish', 'unpublish', 'rejected'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/get/all/content', {
                    method: 'GET'
                });
                const data = await response.json();
                console.log("data", data)
                setAllBlog(data?.allBlog);
                setFilteredData(data?.allBlog);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterBlogs();
    }, [filter, allBlog]);

    const filterBlogs = () => {
        if (filter === 'all') {
            setFilteredData(allBlog);
        } else {
            const filtered = allBlog.filter((data: any) => data?.verified === filter);
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

            <div className='row' style={{ width: "100%", paddingLeft: '60px' }}>

                {/*.. error ... its a fetching problem at heading admin/allBlogs*/}

                {filteredData?.map((data: any, index: number) => (
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

export default Page;
