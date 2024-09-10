
'use client';

import Link from "next/link";

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

export default function AllRatings() {
    const averageRating = 4.2; 

    return (
        <div style={{ padding: "20px 30px" }}>
            <div style={{ width: "100%", backgroundColor: "white", borderRadius: "20px", padding: "18px 30px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px" }}>
                    <div>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: "600" }}>Ratings & Words</h2>
                    </div>
                    <div style={{ fontSize: "1rem", color: "#101010", fontWeight: "600" }}>Average Rating: {averageRating}/5</div>
                    <Link href="/admin/doctors" style={{ textDecoration: "none" }}>
                        <button
                            style={{ fontSize: "1rem", color: "#FFA05D", display: "flex", alignItems: "center", background: "none", cursor: "pointer", border: "1px dashed #ffecd4", padding: "5px 10px", borderRadius: "8px" }}
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
                <div style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "4px" }} className="scrollable-content">
                    {ratingsData.map((rating) => (
                        <div key={rating.id} style={{ display: "flex", alignItems: "start", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #ffecd4" }}>
                            <img
                                src={rating.avatar}
                                alt={rating.name}
                                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "20px" }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap:"40px", alignItems: "center", marginBottom: "4px" }}>
                                    <h3 style={{ fontSize: "0.875rem", fontWeight: "500", margin: "0" }}>{rating.name} - <span style={{ color: "#ff6500" }}>{rating.reviewer}</span></h3>
                                </div>
                                <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: "0" }}>{rating.date}</p>
                                <p style={{ fontSize: "0.875rem", margin: "0" }}>{rating.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
