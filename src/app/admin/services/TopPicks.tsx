'use client'

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


import ServiceStats from "./ServiceStats";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";


export default function TopPicks() {
    const [showAll, setShowAll] = useState(false);
    const [topPicksByUser, setTopPicksByUser] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/get/service/stats', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("data recieved", data)
                setTopPicksByUser(data?.data?.allServices || []);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setTopPicksByUser([]);
                setLoading(false);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/delete/service/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error('Failed to delete the service.');
            }

            setTopPicksByUser((prevService) =>
                prevService.filter((service) => service.id !== id)
            );

            showToastSuccess('Category deleted successfully.');

        } catch (error) {
            console.error('Error deleting service:', error);
            showToastError('Failed to delete the service.');
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


    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                <div>
                    <ServiceStats />
                </div>
                <div style={{
                    width: "100%",
                    height: "540px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Top <span className="text-orange-600">5 Service Picks</span> By User</span>
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
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 className="mx-2">Loading..</h4>
                    </div>
                    ) : (
                        <div style={{
                            height: showAll ? "calc(500px - 40px)" : "calc(500px - 40px)", // Fixed height, adjust if necessary
                            overflowY: showAll ? "auto" : "hidden", // Enable scroll when showAll is true
                            borderRadius: "10px"
                        }}>
                            <table className="table-auto w-full border-collapse">
                                <thead className="bg-orange-100 rounded-t-lg">
                                    <tr>
                                        <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                                        <th className="text-left p-2 text-gray-600">Service Name</th>
                                        <th className="text-left p-2 text-gray-600">Description</th>
                                        <th className="text-left p-2 text-gray-600 rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topPicksByUser.map((service, index) => (
                                        <tr key={service.id} className="border-b border-gray-300">
                                            <td className="p-2 text-black">{index + 1}</td>
                                            <td className="p-2 text-black">{service.title}</td>
                                            <td className="p-2 text-black">{service.description}</td>
                                            <td className="p-2"  style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <button className="text-orange-600 flex items-center" style={{display: "flex", alignItems: "center", justifyContent: "center"}}  onClick={() => handleDelete(service.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    }
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

