'use client';

import { useState } from "react";
import RecentDoctors from "./RecentDoctors";

const ratingsData = [
    {
        id: 1,
        name: "Rashmi Sharma",
        feedback: "Appointment with you was so good. Thanks for making my Mind Calm & Stable.",
        date: "4 Star on June 28, 2024",
        reviewer: "Sushmita Singh",
        avatar: "/assets/avatar.jpg",
    },
    {
        id: 2,
        name: "Rashmi Sharma",
        feedback: "Appointment with you was so good. Thanks for making my Mind Calm & Stable.",
        date: "4 Star on June 28, 2024",
        reviewer: "Sushmita Singh",
        avatar: "/assets/avatar.jpg",
    },
    {
        id: 3,
        name: "Rashmi Sharma",
        feedback: "Appointment with you was so good. Thanks for making my Mind Calm & Stable.",
        date: "4 Star on June 28, 2024",
        reviewer: "Sushmita Singh",
        avatar: "/assets/avatar.jpg",
    },
    {
        id: 4,
        name: "Rashmi Sharma",
        feedback: "Appointment with you was so good. Thanks for making my Mind Calm & Stable.",
        date: "4 Star on June 28, 2024",
        reviewer: "Sushmita Singh",
        avatar: "/assets/avatar.jpg",
    },
    {
        id: 5,
        name: "Rashmi Sharma",
        feedback: "Appointment with you was so good. Thanks for making my Mind Calm & Stable.",
        date: "4 Star on June 28, 2024",
        reviewer: "Sushmita Singh",
        avatar: "/assets/avatar.jpg",
    },
    // Add more rating objects here
];

export default function DoctorRatings() {
    const [showAllRatings, setShowAllRatings] = useState(false);

    const averageRating = 4.2; // Assuming you have a way to calculate this

    return (
        <>
         <div style={{ width: "100%", backgroundColor: "white", borderRadius: "20px", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px" }}>
                <div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "600" }}>Ratings & Words</h2>
                </div>
                <div style={{ fontSize: "1rem", color: "#101010", fontWeight: "600" }}>Average Rating: {averageRating}/5</div>
                <button
                    onClick={() => setShowAllRatings(!showAllRatings)}
                    style={{ fontSize: "0.875rem", color: "#ff6500", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                >
                    {showAllRatings ? "Show Less" : "See All"}
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
                            d={
                                showAllRatings
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                            }
                        ></path>
                    </svg>
                </button>
            </div>
            <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }} className="scrollable-content">
                {(showAllRatings ? ratingsData : ratingsData.slice(0, 5)).map(
                    (rating) => (
                        <div key={rating.id} style={{ display: "flex", alignItems: "start", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #ffecd4" }}>
                            <img
                                src={rating.avatar}
                                alt={rating.name}
                                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "8px" }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                                    <h3 style={{ fontSize: "0.875rem", fontWeight: "500", margin: "0" }}>{rating.name} - <span style={{ color: "#ff6500" }}>{rating.reviewer}</span></h3>
                                </div>
                                <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: "0" }}>{rating.date}</p>
                                <p style={{ fontSize: "0.875rem", margin: "0" }}>{rating.feedback}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
           
        </div>
         <RecentDoctors />
        </>
    );
}
