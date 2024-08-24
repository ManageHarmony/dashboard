'use client'

import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function ContentActionBar() {

    const [loading, setLoading] = useState(false);

    return (
        <>
            <div style={{ width: "100%" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange", }}>
                                All Catetogories <FiBell className="ml-2" />
                            </button>
                            <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                                All Catetogories <FiBell className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                            All Services <FiBell className="ml-2" />
                        </button>
                        <Link href='/creator/content/blog' style={{textDecoration: "none"}}>
                            <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                            { loading ? <Spinner /> :'Add New Blog'} <FiBell className="ml-2" />
                            </button>
                        </Link>
                        <Link href='/creator/content/article' style={{textDecoration: "none"}}>
                            <button className="text-orange-600 py-2 px-3 rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                            { loading ? <Spinner /> :'Add Article'} <FiBell className="ml-2" />
                            </button>
                        </Link>
                    </div>
                </div>

                <TopBlogs />
                <MostCategories />
            </div>
        </>
    )
}