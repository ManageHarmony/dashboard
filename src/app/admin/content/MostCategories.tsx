'use client';

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function MostCategories() {
    const [showAll, setShowAll] = useState(false);
    const [topMostCategories, setTopMostCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("hi there")
            try {
                const response = await fetch('https://harmony-backend-z69j.onrender.com/api/all/content/categories', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the full response
                console.log('Categories:', data?.data?.allCategory); // Log the specific data you're using
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
                height: showAll ? "calc(270px - 40px)" : "calc(270px - 40px)", 
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
                                    <td className="p-2">
                                        <button className="text-orange-600 flex items-center">
                                            <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                        </button>
                                    </td>
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
        </div>
    );
}
