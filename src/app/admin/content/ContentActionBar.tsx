'use client'

import { useState } from "react";
import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import { FaBlogger, FaYoutube } from "react-icons/fa";
import { MdOutlineArticle, MdPendingActions } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

export default function ContentActionBar() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState<string | null>(null);

    const handleMouseEnter = (buttonType: string) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const handleClick = (buttonType: string) => {
        setLoadingButton(buttonType);
    };

    const buttonStyle = {
        background: "#fff",
        border: "1px dashed orange",
        color: "#ff5500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
        minWidth: "130px"
    };

    const buttonHoverStyle = {
        background: "#ff5500",
        border: "1px solid #ff5500",
        color: "white"
    };

    const getButtonStyle = (buttonType: string) => {
        return hoveredButton === buttonType ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle;
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", paddingBottom: "30px" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 20px", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div className="bar" style={{ display: "flex", gap: "10px" }}>


                            <Link href='/admin/content/allblogs' style={{ textDecoration: "none" }}>
                                <Button
                                    variant="outline-warning"
                                    onClick={() => handleClick("allBlogs")}
                                    onMouseEnter={() => handleMouseEnter("allBlogs")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allBlogs")}
                                    disabled={loadingButton === 'allBlogs'}
                                >
                                    {loadingButton === 'allBlogs' ? <Spinner animation="border"  size="sm" /> : 'All Blogs'} <FaBlogger className="ml-2 fs-5" />
                                </Button>
                            </Link>

                            <Link href='/admin/content/allVideos' style={{ textDecoration: "none" }}>
                                <Button
                                    variant="outline-warning"
                                    onClick={() => handleClick("allVideos")}
                                    onMouseEnter={() => handleMouseEnter("allVideos")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allVideos")}
                                    disabled={loadingButton === 'allVideos'}
                                >
                                    {loadingButton === 'allVideos' ? <Spinner animation="border"  size="sm" /> : 'All Videos'} <FaYoutube className="ml-2 fs-5" />
                                </Button>
                            </Link>
                            <Link href='/admin/content/allArticles' style={{ textDecoration: "none" }}>
                                <Button
                                    variant="outline-warning"
                                    onClick={() => handleClick("allArticles")}
                                    onMouseEnter={() => handleMouseEnter("allArticles")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allArticles")}
                                    disabled={loadingButton === 'allArticles'}
                                >
                                    {loadingButton === 'allArticles' ? <Spinner animation="border"  size="sm" /> : 'All Articles'} <MdOutlineArticle className="ml-2 fs-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <Link href="#" style={{ textDecoration: "none" }}>
                            <Button
                                variant="outline-warning"
                                onClick={() => handleClick("pendingPosts")}
                                onMouseEnter={() => handleMouseEnter("pendingPosts")}
                                onMouseLeave={handleMouseLeave}
                                style={getButtonStyle("pendingPosts")}
                                disabled={loadingButton === "pendingPosts"}
                            >
                                {loadingButton === 'pendingPosts' ? <Spinner animation="border"  size="sm" /> : 'All Pending Posts'} <MdPendingActions className="ml-2 fs-5" />
                            </Button>
                        </Link>

                        <Link href="/admin/content/newCategory" style={{ textDecoration: "none" }}>
                            <Button
                                variant="outline-warning"
                                onClick={() => handleClick("addNewCategory")}
                                onMouseEnter={() => handleMouseEnter("addNewCategory")}
                                onMouseLeave={handleMouseLeave}
                                style={getButtonStyle("addNewCategory")}
                                disabled={loadingButton === "addNewCategory"}
                            >
                                {loadingButton === 'addNewCategory' ? <Spinner animation="border"  size="sm" /> : 'Add New Category'} <BiSolidCategoryAlt className="ml-2 fs-5" />
                            </Button>
                        </Link>
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
    );
}
