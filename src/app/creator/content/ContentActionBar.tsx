'use client'

import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import { useState } from "react";
import { FaBlogger, FaYoutube } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { Button as BootstrapButton } from "react-bootstrap";
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
            <div style={{ width: "100%" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link href='/creator/content/allblogs' style={{ textDecoration: "none" }}>
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
                            <Link href='/creator/content/allArticles' style={{ textDecoration: "none" }}>
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

                            <Link href='/creator/content/allVideos' style={{ textDecoration: "none" }}>
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
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <Link href="/creator/content/ytVideo" style={{ textDecoration: "none" }}>
                            {loadingButton === 'createYtContent' ? (<ButtonLoading />) : (<BootstrapButton
                                type="submit"
                                variant="primary"
                                onClick={() => handleClick("createYtContent")}
                                onMouseEnter={() => handleMouseEnter("createYtContent")}
                                onMouseLeave={handleMouseLeave}
                                style={getButtonStyle('createYtContent')}
                            >
                                Create Yt Content <FaYoutube className="ml-2 fs-5" />
                            </BootstrapButton>)}

                        </Link>
                        <Link href='/creator/content/blog' style={{ textDecoration: "none" }}>
                        {loadingButton === 'newBlog' ? (<ButtonLoading />) : ( <BootstrapButton
                                type="submit"
                                variant="primary"
                                onClick={() => handleClick('newBlog')}
                                onMouseEnter={() => setHoveredButton('newBlog')}
                                onMouseLeave={handleMouseLeave}
                                style={getButtonStyle('newBlog')}
                                disabled={loadingButton === 'newBlog'}
                            >
                                Add New Blog <FaBlogger className="ml-2 fs-5" />
                            </BootstrapButton>)}
                           
                        </Link>
                        <Link href='/creator/content/article' style={{ textDecoration: "none" }}>
                        {loadingButton === 'newArticle' ? (<ButtonLoading />) : (<BootstrapButton
                                type="submit"
                                variant="primary"
                                onClick={() => handleClick('newArticle')}
                                onMouseEnter={() => setHoveredButton('newArticle')}
                                onMouseLeave={handleMouseLeave}
                                style={getButtonStyle('newArticle')}
                                disabled={loadingButton === 'newArticle'}
                            >
                                Add New Article <MdOutlineArticle className="ml-2 fs-5" />
                            </BootstrapButton>)}
                            
                        </Link>
                    </div>
                </div>

                <TopBlogs />
                <MostCategories />
            </div>
        </>
    )
}
