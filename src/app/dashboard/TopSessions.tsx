
import {
 
  CardTitle,
} from "@/components/ui/card";


import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const topSessionsData = [
  { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
  { id: 2, name: "Kanika Jindal", times: 35 },
  { id: 3, name: "Shubham Solanki", times: 31 },
  { id: 4, name: "Mikakshi Sisodia", times: 28 },
  { id: 5, name: "Rishi Kumar", times: 18 },
];

export default function TopSessions() {
  return (

    <div className="top-sessions-container bg-white rounded shadow p-4">
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
        <a href="#see-all" className="text-sm text-orange-600 flex items-center mb-2">
          See All
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
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
          {topSessionsData.map((consultant, index) => (
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
  );
}
