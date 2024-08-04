'use client'

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import '../dashboard/customScrollbar.css'

const ticketsData = [
  {
    id: 1,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 2,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 3,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 4,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  // Add more ticket objects here
];

export default function RecentTickets() {
  const [showAll, setShowAll] = useState(false);

  return (


    <Card className="recent-tickets-container">
      <CardHeader className="cardHeader">
        <CardTitle>Recent <span className="text-orange-600">Tickets</span></CardTitle>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-orange-600 flex items-center"
        >
          {showAll ? "Show Less" : "See All"}{" "}
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
                showAll
                  ? "M5 15l7-7 7 7"
                  : "M19 9l-7 7-7-7"
              }
            ></path>
          </svg>
        </button>
      </CardHeader>
      <CardContent >
        <div className="space-y-0">
          {(showAll ? ticketsData : ticketsData.slice(0, 3)).map(
            (ticket) => (
              <div key={ticket.id} className="flex items-start scrollable-content">
                <img
                  src={ticket.avatar}
                  alt={ticket.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div style={{ borderBottom: "1px solid #ffecd4", marginBottom: "0px"}}>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <CardTitle className="text-sm font-medium">
                      {ticket.name}
                    </CardTitle>
                    <span>~</span>
                    <CardDescription className="text-xs text-orange-600">
                      {ticket.description}
                    </CardDescription>
                  </div>
                  <p className="text-gray-500 text-xs">{ticket.date}</p>
                  <p className="text-sm">{ticket.message}</p>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>

  );
}
