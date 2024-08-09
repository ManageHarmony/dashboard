'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const doctorApplicationData = [
    { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 2, name: "Kanika Jindal", times: 35 },
    { id: 3, name: "Shubham Solanki", times: 31 },
    { id: 4, name: "Mikakshi Sisodia", times: 28 },
    { id: 5, name: "Rishi Kumar", times: 18 },
    { id: 6, name: "Rishi Kumar", times: 18 },
];

export default function RecentDoctors() {
    const [showAll, setShowAll] = useState(false);
    return (
        <>
            <div style={{
                width: "100%",
                height: "370px", 
                backgroundColor: "white",
                borderRadius: "20px", 
                padding: "20px", 
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                marginTop: "20px"
            }}>
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">Top Picks</span>
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
                        height: showAll ? "calc(320px - 40px)" : "calc(320px - 40px)", // Fixed height, adjust if necessary
                        overflowY: showAll ? "auto" : "hidden", // Enable scroll when showAll is true
                        borderRadius: "10px"
                    }}>
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-orange-100 rounded-t-lg">
                                <tr>
                                    <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                                    <th className="text-left p-2 text-gray-600">Therapist Name</th>
                                    <th className="text-left p-2 text-gray-600">Applied on</th>
                                    <th className="text-left p-2 text-gray-600 rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorApplicationData.map((consultant, index) => (
                                    <tr key={consultant.id} className="border-b border-gray-300">
                                        <td className="p-2 text-black">{index + 1}</td>
                                        <td className="p-2 text-black">{consultant.name}</td>
                                        <td className="p-2 text-black">{consultant.times}</td>
                                        <td className="p-2">
                                            <button className="text-orange-600 flex items-center">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
    );
}
