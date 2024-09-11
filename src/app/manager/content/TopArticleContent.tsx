'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";



const topConsultantsData = [
  { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
  { id: 2, name: "Kanika Jindal", times: 35 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },

  { id: 5, name: "Rishi Kumar", times: 18 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },

];

export default function TopArticleContent() {
  const [showAll, setShowAll] = useState(false)
  return (
    <div style={{
      width: "100%",
      height: "445px",
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginTop: "20px"
  }}>
      <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Top Blog</span>
          <Link href="#" style={{ textDecoration: "none" }}>
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
          height: showAll ? "calc(400px - 40px)" : "calc(400px - 40px)", // Fixed height, adjust if necessary
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
                  {topConsultantsData.map((consultant, index) => (
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
  );
}
