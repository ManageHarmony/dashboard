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
import ContentActionBar from "./ContentActionBar";
import MostCategories from "./MostCategories";

const doctorApplicationData = [
    { id: 1, name: "Dr. Naseem Ahmad", times: 45 },
    { id: 2, name: "Kanika Jindal", times: 35 },
    { id: 3, name: "Shubham Solanki", times: 31 },
    { id: 4, name: "Mikakshi Sisodia", times: 28 },
    { id: 5, name: "Rishi Kumar", times: 18 },
   
];

export default function TopBlogs() {
    return (
        <>
            <Card className="top-blogs-container">
                <CardHeader className="cardHeader">
                    <CardTitle>
                        <span className="font-bold text-lg">Top Blogs <span className="text-orange-600 mx-2">5 Reads</span>By User</span>
                    </CardTitle>
                    <a
                        href="#see-all"
                        className="text-sm text-orange-600 flex items-center"
                    >
                        See All{" "}
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
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </a>
                </CardHeader>
                <CardContent>
                    <Table>
                        {/* <TableCaption>Top 5 Consultants Picks by Users</TableCaption> */}
                        <TableHeader>
                            <TableRow className="bg-orange-100">
                                <TableHead className="text-left">Sr. No</TableHead>
                                <TableHead className="text-left">Therapist Name</TableHead>
                                <TableHead className="text-left">Times</TableHead>
                                <TableHead className="text-left">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctorApplicationData.map((consultant, index) => (
                                <TableRow key={consultant.id} className="table-row-compact">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{consultant.name}</TableCell>
                                    <TableCell>{consultant.times}</TableCell>
                                    <TableCell>
                                        <button className="text-orange-600 flex items-center">
                                            <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
