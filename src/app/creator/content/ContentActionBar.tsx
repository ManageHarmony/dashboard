'use client'

import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import { useState } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import CreateYTContent from "./YtContent";

export default function ContentActionBar() {
    const [loadingButton, setLoadingButton] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleCreateYTContentClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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
        transition: "background-color 0.3s, color 0.3s, border 0.3s"
    };

    const buttonHoverStyle = {
        background: "#ff5500",
        border: "1px solid #ff5500",
        color: "white"
    };

    const getButtonStyle = (isHovered: boolean) => {
        return isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle;
    };

    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    return (
        <>
            <div style={{ width: "100%" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Link href="/creator/content/allBlogs" style={{ textDecoration: "none" }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => handleClick('allBlogs')}
                                    onMouseEnter={() => setHoveredButton('allBlogs')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={getButtonStyle(hoveredButton === 'allBlogs')}
                                    disabled={loadingButton === 'allBlogs'}
                                >
                                    {loadingButton === 'allBlogs' ? <Spinner animation="border" size="sm" /> : 'All Blogs'} <FiBell className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/creator/content/allArticles" style={{ textDecoration: "none" }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => handleClick('allArticles')}
                                    onMouseEnter={() => setHoveredButton('allArticles')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={getButtonStyle(hoveredButton === 'allArticles')}
                                    disabled={loadingButton === 'allArticles'}
                                >
                                    {loadingButton === 'allArticles' ? <Spinner animation="border" size="sm" /> : 'All Articles'} <FiBell className="ml-2" />
                                </Button>
                            </Link>
                            <Link href="/creator/content/allVideos" style={{ textDecoration: "none" }}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => handleClick('allYtVideos')}
                                    onMouseEnter={() => setHoveredButton('allYtVideos')}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    style={getButtonStyle(hoveredButton === 'allYtVideos')}
                                    disabled={loadingButton === 'allYtVideos'}
                                >
                                    {loadingButton === 'allYtVideos' ? <Spinner animation="border" size="sm" /> : 'All Videos'} <FiBell className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleCreateYTContentClick}
                            onMouseEnter={() => setHoveredButton('createYtContent')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={getButtonStyle(hoveredButton === 'createYtContent')}
                        >
                            Create Yt Content <FiBell className="ml-2" />
                        </Button>
                        <Link href='/creator/content/blog' style={{ textDecoration: "none" }}>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={() => handleClick('newBlog')}
                                onMouseEnter={() => setHoveredButton('newBlog')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={getButtonStyle(hoveredButton === 'newBlog')}
                                disabled={loadingButton === 'newBlog'}
                            >
                                {loadingButton === 'newBlog' ? <Spinner animation="border" size="sm" /> : 'Add New Blog'} <FiBell className="ml-2" />
                            </Button>
                        </Link>
                        <Link href='/creator/content/article' style={{ textDecoration: "none" }}>
                            <Button
                                type="submit"
                                variant="primary"
                                onClick={() => handleClick('newArticle')}
                                onMouseEnter={() => setHoveredButton('newArticle')}
                                onMouseLeave={() => setHoveredButton(null)}
                                style={getButtonStyle(hoveredButton === 'newArticle')}
                                disabled={loadingButton === 'newArticle'}
                            >
                                {loadingButton === 'newArticle' ? <Spinner animation="border" size="sm" /> : 'Add New Article'} <FiBell className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <TopBlogs />
                <MostCategories />

                <Modal
                    show={showModal} onHide={handleCloseModal}
                    fullscreen={true}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Modal.Body style={{
                        backgroundColor: '#daf7fd7e',
                        position: "relative",
                        height: "100%",
                        padding: "40px"
                    }}>
                        <Button
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                backgroundColor: "transparent",
                                color: "#000000",
                                border: "none",
                                fontSize: "1.5rem",
                                fontWeight: "bold"
                            }}
                            onClick={handleCloseModal}
                        >
                            &times;
                        </Button>
                        <CreateYTContent />
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
