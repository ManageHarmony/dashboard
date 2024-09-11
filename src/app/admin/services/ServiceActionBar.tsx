'use client';

import { useState } from "react";
import { FiBell } from "react-icons/fi";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

export default function ServiceActionBar() {
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
        <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className=" fs-4 font-semibold mb-2">Action Bar</div>
                <Button
                    variant="outline-warning"
                    onClick={() => handleClick("allServiceCategory")}
                    onMouseEnter={() => handleMouseEnter("allServiceCategory")}
                    onMouseLeave={handleMouseLeave}
                    style={getButtonStyle("allServiceCategory")}
                    disabled={loadingButton === "allServiceCategory"}
                >
                    {loadingButton === 'allServiceCategory' ? <Spinner animation="border"  size="sm" /> : 'All Service Category'} <FiBell className="ml-2" />
                </Button>
            </div>
            <div className="flex space-x-3 mt-2">
                <Button
                    variant="outline-warning"
                    onClick={() => handleClick("allServices")}
                    onMouseEnter={() => handleMouseEnter("allServices")}
                    onMouseLeave={handleMouseLeave}
                    style={getButtonStyle("allServices")}
                    disabled={loadingButton === "allServices"}
                >
                    {loadingButton === 'allServices' ? <Spinner animation="border"  size="sm" /> : 'All Services'} <FiBell className="ml-2" />
                </Button>

                <Link href='/admin/services/new-service' style={{ textDecoration: "none" }}>
                    <Button
                        variant="outline-warning"
                        onClick={() => handleClick("addNewService")}
                        onMouseEnter={() => handleMouseEnter("addNewService")}
                        onMouseLeave={handleMouseLeave}
                        style={getButtonStyle("addNewService")}
                        disabled={loadingButton === "addNewService"}
                    >
                        {loadingButton === 'addNewService' ? <Spinner animation="border"  size="sm" /> : 'Add New Service'} <FiBell className="ml-2" />
                    </Button>
                </Link>

                <Button
                    variant="outline-warning"
                    onClick={() => handleClick("allCategories")}
                    onMouseEnter={() => handleMouseEnter("allCategories")}
                    onMouseLeave={handleMouseLeave}
                    style={getButtonStyle("allCategories")}
                    disabled={loadingButton === "allCategories"}
                >
                    {loadingButton === 'allCategories' ? <Spinner animation="border"  size="sm" /> : 'All Categories'} <FiBell className="ml-2" />
                </Button>
            </div>
        </div>
    );
}
