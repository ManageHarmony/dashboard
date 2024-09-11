'use client';

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveCategory } from "@/app/redux/slices/exampleSlice";
import Link from "next/link";



export default function MostCategories() {
    const [showAll, setShowAll] = useState(false);
    const [topMostCategories, setTopMostCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const topCat = useSelector((state:any) => state.example.savedCategory);
    console.log("COUNT",topCat)
    const router = useRouter();
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
                dispatch(saveCategory(data?.data?.allCategory));


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

    const handleEdit = (data:any) => {
        // Store data in sessionStorage before navigating
        console.log('data we are getting to be sqaved', data);
        sessionStorage.setItem('editCategoryData', JSON.stringify(data));
        router.push('/admin/content/edit-category');
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/delete/category/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete the category.');
            }

            const updatedCategories = topMostCategories.filter((category) => category.id !== id);

            setTopMostCategories(updatedCategories);
    
            dispatch(saveCategory(updatedCategories));
            console.log("COUNT--->",topCat)

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
        }}>
            <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Top Category</span>
                <Link href="#" style={{ textDecoration: "none" }}>
                    <button
                        style={{ fontSize: "1rem", color: "#FFA05D", display: "flex", alignItems: "center", background: "none", cursor: "pointer", border: "1px dashed #ffecd4", padding: "5px 10px", borderRadius: "8px" }}
                    >
                        See All
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }} width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <path d="M8 2.875H2.75C2.28587 2.875 1.84075 3.07254 1.51256 3.42417C1.18437 3.77581 1 4.25272 1 4.75V14.125C1 14.6223 1.18437 15.0992 1.51256 15.4508C1.84075 15.8025 2.28587 16 2.75 16H11.5C11.9641 16 12.4092 15.8025 12.7374 15.4508C13.0656 15.0992 13.25 14.6223 13.25 14.125V8.5" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12.6504L12.875 4.21289" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.625 1H15V5.6875" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </Link>
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
                        {topCat.length > 0 ? (
                            topCat.map((data:any, index:any) => (
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

                                            <Dropdown.Item className="flex items-center text-sm p-2" onClick={()=> handleEdit(data)}>
                                                    <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                                                    Edit

                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                className="flex items-center text-sm p-2"
                                                onClick={() => handleDelete(data.id)}
                                            >
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
