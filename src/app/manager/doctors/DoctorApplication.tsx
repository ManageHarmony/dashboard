'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import DoctorStats from "./DoctorStats";
import ActionBarDoctors from "./ActionBarDoctors";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";

const doctorApplicationData = [
    { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 2, name: "Kanika Jindal", times: 35 },
    { id: 3, name: "Shubham Solanki", times: 31 },
    { id: 4, name: "Mikakshi Sisodia", times: 28 },
    { id: 5, name: "Rishi Kumar", times: 18 },
    { id: 6, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 7, name: "Kanika Jindal", times: 35 },
    { id: 8, name: "Shubham Solanki", times: 31 },
    { id: 9, name: "Mikakshi Sisodia", times: 28 },
    { id: 10, name: "Rishi Kumar", times: 18 },
    { id: 8, name: "Shubham Solanki", times: 31 },
    { id: 9, name: "Mikakshi Sisodia", times: 28 },
    { id: 10, name: "Rishi Kumar", times: 18 },
];

export default function DoctorApplication() {
    const [showAll, setShowAll] = useState(false);

    return (
        <>
            <div style={{ width: "100%" }}>
                <DoctorStats />
                <ActionBarDoctors />
                <div style={{
                    width: "100%",
                    height: "575px",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Top Applications</span>
                        <Link href="/manager/doctors/allApplications" style={{ textDecoration: "none" }}>
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
                        height: showAll ? "calc(530px - 40px)" : "calc(530px - 40px)", // Fixed height, adjust if necessary
                        overflowY: showAll ? "auto" : "hidden", // Enable scroll when showAll is true
                        borderRadius: "10px"
                    }}>
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-orange-100 rounded-t-lg">
                                <tr>
                                    <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
                                    <th className="text-left p-2 text-gray-600">Therapist Name</th>
                                    <th className="text-left p-2 text-gray-600">Applied on</th>
                                    <th className="text-center p-2 text-gray-600 rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorApplicationData.map((consultant, index) => (
                                    <tr key={consultant.id} className="border-b border-gray-300">
                                        <td className="p-2 text-black">{index + 1}</td>
                                        <td className="p-2 text-black">{consultant.name}</td>
                                        <td className="p-2 text-black">{consultant.times}</td>
                                        <Dropdown className="p-2">
                                            <Dropdown.Toggle
                                                as="button"
                                                className="text-orange-600 flex items-center border-0 bg-transparent p-0"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none">
                                                    <rect width="32" height="32" rx="6" fill="#FFE3D0" />
                                                    <path d="M29.0947 16.5733C28.984 16.4147 26.3454 12.648 22.704 10.0733C20.816 8.736 18.4347 8 16 8C13.5667 8 11.1854 8.736 9.29336 10.0733C5.65203 12.648 3.01603 16.4147 2.90536 16.5733C2.58803 17.0307 2.58803 17.6373 2.90536 18.0947C3.01603 18.2533 5.65203 22.02 9.29336 24.5947C11.1854 25.9307 13.5667 26.6667 16 26.6667C18.4347 26.6667 20.816 25.9307 22.704 24.5933C26.3454 22.0187 28.984 18.252 29.0947 18.0933C29.4134 17.6373 29.4134 17.0293 29.0947 16.5733ZM16 22C13.4214 22 11.3334 19.9067 11.3334 17.3333C11.3334 14.7547 13.4214 12.6667 16 12.6667C18.5734 12.6667 20.6667 14.7547 20.6667 17.3333C20.6667 19.9067 18.5734 22 16 22ZM18.6667 17.3333C18.6667 18.8027 17.4694 20 16 20C14.5267 20 13.3334 18.8027 13.3334 17.3333C13.3334 15.86 14.5267 14.6667 16 14.6667C17.4694 14.6667 18.6667 15.86 18.6667 17.3333Z" fill="#FFA05D" />
                                                </svg>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>

                                                <Dropdown.Item className="flex items-center text-sm p-2" >
                                                    <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                                                    Edit

                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className="flex items-center text-sm p-2"

                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
