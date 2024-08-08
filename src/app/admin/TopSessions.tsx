import { CardTitle } from "@/components/ui/card";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const topSessionsData = [
  { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
  { id: 2, name: "Kanika Jindal", times: 35 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },
  // You can add more data here to test scrolling
];

export default function TopSessions() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div style={{ width: "100%", height: "350px", backgroundColor: "white", borderRadius: "20px", padding: "20px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div className="flex justify-between items-center mb-3">
        <CardTitle>
          <span className="font-bold text-lg">Top 5 Sessions</span>{" "}
          <span className="font-normal text-lg">by Users</span>
          <div style={{
            width: "40%",
            height: "2px",
            backgroundColor: "#ff6600",
            display: "block"
          }}></div>
        </CardTitle>
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

      <div style={{ maxHeight: "calc(100% - 48px)", overflowY: "auto", paddingRight: "16px" }} className="scrollable-content">
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
            {(showAll ? topSessionsData : topSessionsData.slice(0, 5)).map((session, index) => (
              <tr key={session.id} className="border-b border-gray-300">
                <td className="p-2 text-black">{index + 1}</td>
                <td className="p-2 text-black">{session.name}</td>
                <td className="p-2 text-black">{session.times}</td>
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
