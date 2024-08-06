'use client'

import { useState } from "react";
import './customScrollbar.css'

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
    <div style={{ width: "100%", height: "350px", backgroundColor: "white", borderRadius: "20px", padding: "20px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", paddingBottom: "8px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "600" }}>Recent <span style={{ color: "#ff6500" }}>Tickets</span></h2>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{ fontSize: "0.875rem", color: "#ff6500", display: "flex", alignItems: "center", background: "none", cursor: "pointer", border: "1px dashed #ffecd4", padding: "5px 10px", borderRadius: "8px" }}
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
      <div style={{ maxHeight: "calc(100% - 48px)", overflowY: "auto", paddingRight: "4px" }} className="scrollable-content">
        {(showAll ? ticketsData : ticketsData.slice(0, 3)).map(
          (ticket) => (
            <div key={ticket.id} style={{ display: "flex", alignItems: "start", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #ffecd4" }}>
              <img
                src={ticket.avatar}
                alt={ticket.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "8px" }}
              />
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: "500", margin: "0" }}>{ticket.name}</h3>
                  <span style={{ margin: "0 4px" }}>~</span>
                  <p style={{ fontSize: "0.75rem", color: "#ff6500", margin: "0" }}>{ticket.description}</p>
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: "0" }}>{ticket.date}</p>
                <p style={{ fontSize: "0.875rem", margin: "0" }}>{ticket.message}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
