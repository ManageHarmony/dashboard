'use client';

import { useState } from "react";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import { Button as BootstrapButton } from "react-bootstrap";
import { FaBlogger, FaYoutube } from "react-icons/fa";
import { MdOutlineArticle, MdPendingActions } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Loader2 } from "lucide-react";

// Button Loading Component
export function ButtonLoading() {
    return (
        <BootstrapButton disabled style={{ backgroundColor: '#fff', border: "1px dashed orange", width: "auto", color: "#ff6600", display: "flex", alignItems: "center" }}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait...</span>
        </BootstrapButton>
    );
}

export default function ContentActionBar() {
    const [loadingButton, setLoadingButton] = useState<string | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleClick = (buttonType: string) => {
        setLoadingButton(buttonType);
    };

    const handleMouseEnter = (buttonType: string) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const buttonStyle = {
        background: "#fff",
        border: "1px dashed orange",
        color: "#ff6600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
        width: "auto"
    };

    const buttonHoverStyle = {
        background: "#ff6600",
        border: "1px solid #ff6600",
        color: "white"
    };

    const loadingButtonStyle = {
        backgroundColor: "#f7f7f7",
        borderColor: "#ccc",
        color: "#999"
    };

    const getButtonStyle = (buttonType: string) => {
        if (loadingButton === buttonType) {
            return { ...buttonStyle, ...loadingButtonStyle };
        } else if (hoveredButton === buttonType) {
            return { ...buttonStyle, ...buttonHoverStyle };
        }
        return buttonStyle;
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", paddingBottom: "30px" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 20px", borderRadius: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div className="bar" style={{ display: "flex", gap: "10px" }}>

                            {/* <Link href="#" style={{ textDecoration: "none" }}>
                                {loadingButton === 'pendingPosts' ? (
                                    <ButtonLoading />
                                ) : (
                                    <BootstrapButton
                                        variant="outline-warning"
                                        onClick={() => handleClick("pendingPosts")}
                                        onMouseEnter={() => handleMouseEnter("pendingPosts")}
                                        onMouseLeave={handleMouseLeave}
                                        style={getButtonStyle("pendingPosts")}
                                    >
                                        All Pending Posts <MdPendingActions className="ml-2 fs-5" />
                                    </BootstrapButton>
                                )}
                            </Link> */}

                            <Link href="/admin/content/newCategory" style={{ textDecoration: "none" }}>
                                {loadingButton === 'addNewCategory' ? (
                                    <ButtonLoading />
                                ) : (
                                    <BootstrapButton
                                        variant="outline-warning"
                                        onClick={() => handleClick("addNewCategory")}
                                        onMouseEnter={() => handleMouseEnter("addNewCategory")}
                                        onMouseLeave={handleMouseLeave}
                                        style={getButtonStyle("addNewCategory")}
                                    >
                                        Add New Category <BiSolidCategoryAlt className="ml-2 fs-5" />
                                    </BootstrapButton>
                                )}
                            </Link>

                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <Link href='/admin/content/allblogs' style={{ textDecoration: "none" }}>
                            {loadingButton === 'allBlogs' ? (
                                <ButtonLoading />
                            ) : (
                                <BootstrapButton
                                    variant="outline-warning"
                                    onClick={() => handleClick("allBlogs")}
                                    onMouseEnter={() => handleMouseEnter("allBlogs")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allBlogs")}
                                >
                                    All Blogs <FaBlogger className="ml-2 fs-5" />
                                </BootstrapButton>
                            )}
                        </Link>

                        <Link href='/admin/content/allVideos' style={{ textDecoration: "none" }}>
                            {loadingButton === 'allVideos' ? (
                                <ButtonLoading />
                            ) : (
                                <BootstrapButton
                                    variant="outline-warning"
                                    onClick={() => handleClick("allVideos")}
                                    onMouseEnter={() => handleMouseEnter("allVideos")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allVideos")}
                                >
                                    All Videos <FaYoutube className="ml-2 fs-5" />
                                </BootstrapButton>
                            )}
                        </Link>

                        <Link href='/admin/content/allArticles' style={{ textDecoration: "none" }}>
                            {loadingButton === 'allArticles' ? (
                                <ButtonLoading />
                            ) : (
                                <BootstrapButton
                                    variant="outline-warning"
                                    onClick={() => handleClick("allArticles")}
                                    onMouseEnter={() => handleMouseEnter("allArticles")}
                                    onMouseLeave={handleMouseLeave}
                                    style={getButtonStyle("allArticles")}
                                >
                                    All Articles <MdOutlineArticle className="ml-2 fs-5" />
                                </BootstrapButton>
                            )}
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
