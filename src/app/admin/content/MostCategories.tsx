'use client';

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function MostCategories() {
    const [showAll, setShowAll] = useState(false);
    const [topMostCategories, setTopMostCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/all/content/categories', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTopMostCategories(data?.data?.allCategory || []);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setTopMostCategories([]);
                setLoading(false);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/delete/category/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete the category.');
            }

            setTopMostCategories((prevCategories) =>
                prevCategories.filter((category) => category.id !== id)
            );

            showToastSuccess('Category deleted successfully.');

        } catch (error) {
            console.error('Error deleting category:', error);
            showToastError('Failed to delete the category.');
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
            progress: undefined,
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
            progress: undefined,
        });
    };

    if (loading) {
        return (
            <div className="text-center p-4">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div style={{
            width: "100%",
            height: "330px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginTop: "20px"
        }}>
            <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Top Category</span>
                <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                        fontSize: "0.875rem",
                        color: "#ff6500",
                        display: "flex",
                        alignItems: "center",
                        background: "none",
                        cursor: "pointer",
                        border: "1px dashed #ffecd4",
                        padding: "5px 10px",
                        borderRadius: "8px"
                    }}
                >
                    {showAll ? "Show Less" : "See All"}{" "}
                    <svg
                        style={{ marginLeft: "4px", width: "16px", height: "16px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={showAll ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        ></path>
                    </svg>
                </button>
            </div>
            <div style={{
                height: showAll ? "calc(280px - 40px)" : "calc(280px - 40px)",
                overflowY: showAll ? "auto" : "hidden",
                borderRadius: "10px"
            }}>
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-orange-100 rounded-t-lg">
                        <tr>
                            <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                            <th className="text-left p-2 text-gray-600">Category Name</th>
                            <th className="text-left p-2 text-gray-600">Description</th>
                            <th className="text-left p-2 text-gray-600 rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topMostCategories.length > 0 ? (
                            topMostCategories.map((data, index) => (
                                <tr key={data.id} className="border-b border-gray-300">
                                    <td className="p-2 text-black">{index + 1}</td>
                                    <td className="p-2 text-black">{data.category}</td>
                                    <td className="p-2 text-black">{data.description}</td>
                                                                            <Dropdown>
                                            <Dropdown.Toggle
                                                as="button"
                                                className="text-orange-600 flex items-center border-0 bg-transparent p-0"
                                            >
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>
                                                <Dropdown.Item  className="flex items-center text-sm p-2">
                                                    <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item className="flex items-center text-sm p-2" onClick={() => handleDelete(data.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center p-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
}
