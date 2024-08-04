'use client';

import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
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
        id: 4,
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
        <div>
            <Card className="doctor-ratings-container">
                <CardHeader className="d-flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Ratings & Words</CardTitle>
                    </div>
                    <CardDescription>Average Rating: {averageRating}/5</CardDescription>
                    <button
                        onClick={() => setShowAllRatings(!showAllRatings)}
                        className="text-sm text-orange-600 flex items-center"
                    >
                        {showAllRatings ? "Show Less" : "See All"}
                        <svg
                            className="ml-1 w-4 h-4"
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
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {(showAllRatings ? ratingsData : ratingsData.slice(0, 5)).map(
                            (rating) => (
                                <div key={rating.id} className="flex items-start">
                                    <img
                                        src={rating.avatar}
                                        alt={rating.name}
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                    <div style={{ borderBottom: "1px solid #ffecd4", }}>
                                        <CardTitle className="text-sm font-medium">
                                            {rating.name} - <span className="text-orange-600">{rating.reviewer}</span>
                                        </CardTitle>
                                        <CardDescription className="text-xs text-gray-500">
                                            {rating.date}
                                        </CardDescription>
                                        <p className="text-sm mb-2">{rating.feedback}</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>
            <RecentDoctors />
        </div>
    );
}
