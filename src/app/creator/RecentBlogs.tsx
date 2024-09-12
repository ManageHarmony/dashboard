import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CardTitle } from "@/components/ui/card";
import './customScrollbar.css';
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const RecentBlogsData = [
  { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
  { id: 2, name: "Shubham Jindal", times: 35 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },
  { id: 6, name: "Another Consultant", times: 16 },
  { id: 7, name: "More Consultants", times: 12 },
  // Add more data as needed to test scrolling
];

export default function RecentBlogs() {
  const displayedData = RecentBlogsData.slice(0, 5);
  //COPY THIS ANMOL
  const articleContent = useSelector((state: any) => state.example.articleContent);
  const ytContents = useSelector((state: any) => state.example.ytContents);
  const data = useSelector((state: any) => state.example.blogData);
  console.log(data);
  return (
    <div style={{ width: "100%", height: "350px", backgroundColor: "white", borderRadius: "20px", padding: "18px 20px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="flex justify-between items-center" style={{ marginBottom: "10px" }}>
        <CardTitle>
          <span className="font-bold text-lg">Recent Blog Posts</span>{" "}
          <span className="font-normal text-lg">by Users</span>
          <div style={{ width: "40%", height: "2px", backgroundColor: "#ff6600", display: "block" }}></div>
        </CardTitle>
        <Link href="/creator/consultantData" style={{ textDecoration: "none" }}>
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

      <div style={{ maxHeight: "calc(100% - 20px)", overflowY: "auto" }} className="scrollable-content">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-orange-100 rounded-t-lg">
            <tr>
              <th className="text-left p-2 text-gray-600 rounded-tl-lg">Sr. No</th>
              <th className="text-left p-2 text-gray-600">Category</th>
              <th className="text-left p-2 text-gray-600">Headings</th>
              <th className="text-left p-2 text-gray-600">Verified</th>

              <th className="text-left p-2 text-gray-600">Creator ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(( item:any, index:any ) => {
              console.log("ITEM", item)
              return <tr key={item?.id} className="border-b border-gray-300" style={{ fontSize: "16px" }}>
                <td className="p-2 text-black">{index + 1}</td>
                <td className="p-2 text-black">{item?.category.join(', ')}</td>
                <td className="p-2 text-black">
                  <div>
                    <strong>H1:</strong> {item?.data.headings.h1.join(', ')}
                  </div>
                  {item?.data.headings.h2.length > 0 && <div>
                    <strong>H2:</strong> {item?.data.headings.h2.join(', ')}
                  </div>}
                  
                  {/* Repeat for other heading levels if needed */}
                </td>


                <td className="p-2 text-black">{item?.verified}</td>

                <td className="p-2 text-black">{item?.blog_creatorId}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
