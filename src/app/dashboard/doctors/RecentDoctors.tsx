import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const doctorApplicationData = [
    { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 2, name: "Kanika Jindal", times: 35 },
    { id: 3, name: "Shubham Solanki", times: 31 },
    { id: 4, name: "Mikakshi Sisodia", times: 28 },
    { id: 5, name: "Rishi Kumar", times: 18 },
    { id: 6, name: "Rishi Kumar", times: 18 },
];

export default function RecentDoctors() {
    return (
        <>
            <div className="recent-doctors-container  bg-white rounded shadow p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">Top Picks</span>
                        <a href="#see-all" className="text-sm text-orange-600 flex items-center">
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
                            {doctorApplicationData.map((consultant, index) => (
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
        </>
    );
}
