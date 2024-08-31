import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";


export default function ContentActionBar() {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", paddingBottom: "30px" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 20px", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div className="bar" style={{ display: "flex", gap: "10px" }}>
                            <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ border: "1px dashed orange" }}>
                                Pending Posts <FiBell className="ml-2" />
                            </button>

                            <Link className="bar" href="/admin/content/newCategory" style={{ textDecoration: "none" }}>
                                <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ border: "1px dashed orange" }}>
                                    Add New Category <FiBell className="ml-2" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="bar flex space-x-3 mt-2">
                        <Link className = 'bar' href='/admin/content/allblogs' style={{ textDecoration: "none" }}>

                            <button className="text-orange-600 py-2 px-3 rounded flex items-center justify-content-between" style={{ border: "1px dashed orange", width: "180px" }}>
                                All Blogs <FiBell className="ml-2" />
                            </button>
                        </Link>

                        <Link className = 'bar' href='/admin/content/allVideos' style={{ textDecoration: "none" }}>
                        <button className="text-orange-600 py-2 px-3 rounded flex items-center justify-content-between" style={{ border: "1px dashed orange", width: "200px" }}>
                            All Videos <FiBell className="ml-2" />
                        </button>
                        </Link>
                        <button className="text-orange-600 py-2 px-3 rounded flex items-center justify-content-between" style={{ border: "1px dashed orange", width: "200px" }}>
                            All Articles <FiBell className="ml-2" />
                        </button>
                    </div>
                </div>

                <div>
                    <TopBlogs />
                </div>
                <div>
                    <MostCategories />
                </div>
            </div>
        </>
    )
}