'use client'

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TopBlog {
    id: number;
    heading: string;
    views: number;
}

export default function AllConsultants() {
    const [topBlogs, setTopBlogs] = useState<TopBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://harmony-backend-z69j.onrender.com/api/admin/get/top/blogs", {
                    method: "GET"
                })
                if (!response.ok) {
                    throw new Error("Failed to fetching data")
                }

                const data = await response.json();
                console.log("data", data?.blogs);
                setTopBlogs(data?.blogs);
                setLoading(false)
            } catch (error) {
                console.error("something went wrong", error)
                setLoading(false)
            }
        }
        fetchData();
    }, []);

    const handleEdit = (blog: TopBlog) => {
        localStorage.setItem('editBlogData', JSON.stringify(blog));
        router.push(`/admin/edit-blog/${blog.id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(``, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete the blog.');
            }

            const updatedArticles = topBlogs.filter(blog => blog.id !== id);
            setTopBlogs(updatedArticles);
            showToastSuccess('Article deleted successfully.');
        } catch (error) {
            console.error('Error deleting blog:', error);
            showToastError('Failed to delete the blog.');
        }
    };

    const showToastError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showToastSuccess = (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div style={{ padding: "20px 30px" }}>
            <div style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "20px 30px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 className="text-xl font-bold mb-4">All Blogs</h1>
                    <Link href="/admin/content" style={{ textDecoration: "none" }}>
                        <button
                           className='see-all w-full'
                        >
                            Go Back{" "}
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }} width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <path d="M8 2.875H2.75C2.28587 2.875 1.84075 3.07254 1.51256 3.42417C1.18437 3.77581 1 4.25272 1 4.75V14.125C1 14.6223 1.18437 15.0992 1.51256 15.4508C1.84075 15.8025 2.28587 16 2.75 16H11.5C11.9641 16 12.4092 15.8025 12.7374 15.4508C13.0656 15.0992 13.25 14.6223 13.25 14.125V8.5" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 12.6504L12.875 4.21289" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.625 1H15V5.6875" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </Link>
                </div>
                {!loading ? (
                    <div style={{
                        height: "calc(100% - 30px)",
                        overflowY: "auto",
                        borderRadius: "10px",
                        padding: "0 20px"
                    }}>
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-orange-100 rounded-t-lg">
                                <tr>
                                    <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                                    <th className="text-left p-2 text-gray-600">Heading</th>
                                    <th className="text-left p-2 text-gray-600">Views</th>
                                    <th className="text-center p-2 text-gray-600 rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topBlogs.length > 0 ? (
                                    topBlogs.map((blog, index) => (
                                        <tr key={blog.id} className="border-b border-gray-300">
                                            <td className="p-2 text-left text-black">{index + 1}</td>
                                            <td className="p-2 text-left text-black">{blog.heading}</td>
                                            <td className="p-2 text-left text-black">{blog.views}</td>
                                            <Dropdown className="p-2">
                                                <Dropdown.Toggle
                                                    as="button"
                                                    className="text-orange-600 flex items-center border-0 bg-transparent p-0"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none">
                                                        <rect width="32" height="32" rx="6" fill="#FFE3D0" />
                                                        <path d="M29.0947 16.5733C28.984 16.4147 26.3454 12.648 22.704 10.0733C20.816 8.736 18.4347 8 16 8C13.5667 8 11.1854 8.736 9.29336 10.0733C5.65203 12.648 3.01603 16.4147 2.90536 16.5733C2.58803 17.0307 2.58803 17.6373 2.90536 18.0947C3.01603 18.2533 5.65203 22.02 9.29336 24.5947C11.1854 25.9307 13.5667 26.6667 16 26.6667C18.4347 26.6667 20.816 25.9307 22.704 24.5933C26.3454 22.0187 28.984 18.252 29.0947 18.0933C29.4134 17.6373 29.4134 17.0293 29.0947 16.5733ZM16 22C13.4214 22 11.3334 19.9067 11.3334 17.3333C11.3334 14.7547 13.4214 12.6667 16 12.6667C18.5734 12.6667 20.6667 14.7547 20.6667 17.3333C20.6667 19.9067 18.5734 22 16 22ZM16 15.3333C14.7847 15.3333 13.6667 16.4513 13.6667 17.6667C13.6667 18.882 14.7847 20 16 20C17.2154 20 18.3334 18.882 18.3334 17.6667C18.3334 16.4513 17.2154 15.3333 16 15.3333Z" fill="#FFA05D" />
                                                    </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>
                                                    <Dropdown.Item onClick={() => handleEdit(blog)}>
                                                        <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDelete(blog.id)}>
                                                        <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-500 p-4">
                                            No blogs available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading Blogs...</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
