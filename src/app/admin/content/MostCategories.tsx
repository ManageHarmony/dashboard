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
import { truncateText } from '../../../utils/textUtils'



export default function MostCategories() {
    const [topMostCategories, setTopMostCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const topCat = useSelector((state: any) => state.example.savedCategory);
    console.log("COUNT", topCat)
    const router = useRouter();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/get/all/category', {
                    method: 'GET',headers:{'x-api-key':apiKey}
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("data", data)
                setTopMostCategories(data?.msg?.allCategory || []);
                setLoading(false);
                dispatch(saveCategory(data?.msg?.allCategory));


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

    const handleEdit = (data: any) => {
        // Store data in LocalStorage before navigating
        console.log('data we are getting to be sqaved', data);
        localStorage.setItem('editCategoryData', JSON.stringify(data));
        router.push('/admin/content/edit-category');
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/delete/category/service/${id}`, {
                method: "DELETE",headers:{'x-api-key':apiKey}

            });

            if (!response.ok) {
                throw new Error('Failed to delete the category.');
            }

            const updatedCategories = topMostCategories.filter((category) => category.id !== id);

            setTopMostCategories(updatedCategories);
            dispatch(saveCategory(updatedCategories));
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

    const handleClick = (id: number) => {
        router.push(``)
    }

    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation();
      };

    return (
        <div style={{
            width: "100%",
            height: "350px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "18px 20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}>
            <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Top Category</span>
                <Link href="/admin/content/allCategories" style={{ textDecoration: "none" }}>
                    <button className='see-all'
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
            {!loading ? (<div style={{
                 maxHeight: "calc(100% - 10px)",padding: "8px"
            }}>
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-orange-100 rounded-t-lg">
                        <tr>
                            <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                            <th className="text-left p-2 text-gray-600">Category Name</th>
                            <th className="text-left p-2 text-gray-600">Assigned Manager</th>
                            <th className="text-center p-2 text-gray-600 rounded-tr-lg">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topCat.length > 0 ? (
                            topCat.map((data: any, index: any) => (
                                <tr key={data.id} className="border-b border-gray-300">
                                    <td className="p-2 text-black">{index + 1}</td>
                                    <td className="p-2 text-black">{truncateText(data?.name, 15)}</td>
                                    <td className="p-2 text-black">{truncateText(data?.assignedManager, 25)}</td>
                                    <Dropdown className="p-2" onClick={handleDropdownClick}>
                                        <Dropdown.Toggle
                                            className="text-orange-600 flex items-center border-0 bg-transparent p-0"
                                            style={{ padding: '4px', lineHeight: '1', height: '32px' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <rect width="32" height="32" rx="6" fill="#FFE3D0" />
                                                <path d="M29.0947 16.5733C28.984 16.4147 26.3454 12.648 22.704 10.0733C20.816 8.736 18.4347 8 16 8C13.5667 8 11.1854 8.736 9.29336 10.0733C5.65203 12.648 3.01603 16.4147 2.90536 16.5733C2.58803 17.0307 2.58803 17.6373 2.90536 18.0947C3.01603 18.2533 5.65203 22.02 9.29336 24.5947C11.1854 25.9307 13.5667 26.6667 16 26.6667C18.4347 26.6667 20.816 25.9307 22.704 24.5933C26.3454 22.0187 28.984 18.252 29.0947 18.0933C29.4134 17.6373 29.4134 17.0293 29.0947 16.5733ZM16 22C13.4214 22 11.3334 19.9067 11.3334 17.3333C11.3334 14.7547 13.4214 12.6667 16 12.6667C18.5734 12.6667 20.6667 14.7547 20.6667 17.3333C20.6667 19.9067 18.5734 22 16 22ZM16 15.3333C14.7847 15.3333 13.6667 16.4513 13.6667 17.6667C13.6667 18.882 14.7847 20 16 20C17.2154 20 18.3334 18.882 18.3334 17.6667C18.3334 16.4513 17.2154 15.3333 16 15.3333Z" fill="#FFA05D" />
                                            </svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px', padding: '4px 0' }}>
                                            <Dropdown.Item onClick={() => handleEdit(data)}>
                                                <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600', fontSize: '16px' }} />
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(data.id)}>
                                                <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600', fontSize: '16px' }} />
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
            </div>) : (<div className="text-center p-4">
                <p>Loading...</p>
            </div>)}
            <ToastContainer />
        </div>
    );
}
