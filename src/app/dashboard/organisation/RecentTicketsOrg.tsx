'use client';

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FiBell, FiPlus } from "react-icons/fi"; // Assuming you're using react-icons for the icons

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
  // {
  //   id: 4,
  //   name: "Rashmi Sharma",
  //   description: "My Payment Done Appointment Cancelled by Doctor",
  //   date: "11:25AM, June 28, 2024",
  //   message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
  //   avatar: "/assets/avatar.jpg",
  // },
  // Add more ticket objects here
];

export default function RecentTicketsOrg() {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div>
        <div className="action-bar text-lg font-semibold mb-2">Action Bar</div>
        <div className="flex space-x-4 mb-4">
          <button className="text-orange-600 py-2 px-4 rounded flex items-center" style={{ background: "#fff" }}>
            All Notifications <FiBell className="ml-2" />
          </button>
          <button className="text-orange-600 py-2 px-4 rounded flex items-center" style={{ background: "#fff" }}>
            <FiPlus className="mr-2" /> Add New Notifications
          </button>
        </div>
      </div>
      <Card className="recent-tickets-container">
        <CardHeader className="cardHeader flex justify-between items-center">
          <CardTitle>
            Recent <span className="text-orange-600">Tickets</span>
          </CardTitle>
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
        <CardContent>
          <div className="space-y-0">
            {(showAll ? ticketsData : ticketsData.slice(0, 3)).map(
              (ticket) => (
                <div key={ticket.id} className="flex items-start">
                  <img
                    src={ticket.avatar}
                    alt={ticket.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div style={{ borderBottom: "1px solid #ffecd4", }}>
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
                    <p className="text-sm mb-2">{ticket.message}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
