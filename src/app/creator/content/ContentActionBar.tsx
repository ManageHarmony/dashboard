'use client'

import { FiBell } from "react-icons/fi";
import MostCategories from "./MostCategories";
import TopBlogs from "./TopBlogs";
import Link from "next/link";
import { useState } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import CreateYTContent from "./YtContent";

export default function ContentActionBar() {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCreateYTContentClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <>
            <div style={{ width: "100%" }}>
                <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", }}>
                        <div className="action-bar fs-4 font-semibold mb-2">Action Bar</div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange", }}>
                                All Categories <FiBell className="ml-2" />
                            </button>
                            <button className="text-orange-600 py-2 px-3  rounded flex items-center" style={{ background: "#fff", border: "1px dashed orange" }}>
                                All Categories <FiBell className="ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-2">
                        <button 
                            className="text-orange-600 py-2 px-3 rounded flex items-center" 
                            style={{ background: "#fff", border: "1px dashed orange" }} 
                            onClick={handleCreateYTContentClick}
                        >
                            Create YT Content <FiBell className="ml-2" />
                        </button>
                        <Link href='/creator/content/blog' style={{ textDecoration: "none" }}>
                            <button 
                                className="text-orange-600 py-2 px-3 rounded flex items-center" 
                                style={{ background: "#fff", border: "1px dashed orange" }} 
                                onClick={handleClick}
                                disabled={loading}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Add New Blog'} <FiBell className="ml-2" />
                            </button>
                        </Link>
                        <Link href='/creator/content/article' style={{ textDecoration: "none" }}>
                            <button 
                                className="text-orange-600 py-2 px-3 rounded flex items-center" 
                                style={{ background: "#fff", border: "1px dashed orange" }} 
                                onClick={handleClick}
                                disabled={loading}
                            >
                                {loading ? <Spinner animation="border" size="sm" /> : 'Add Article'} <FiBell className="ml-2" />
                            </button>
                        </Link>
                    </div>
                </div>

                <TopBlogs />
                <MostCategories />

                {/* <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create YouTube Content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateYTContent />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}

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
