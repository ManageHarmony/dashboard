'use client';

import { useState } from "react";
import Link from "next/link";
import { Button as BootstrapButton } from "react-bootstrap";
import { Loader2 } from "lucide-react";
import { RiServiceLine } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";

export function ButtonLoading() {
    return (
        <BootstrapButton disabled style={{ backgroundColor: '#fff', border: "1px dashed orange", width: "auto", color: "#ff6600", display: "flex", alignItems: "center" }}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait...</span>
        </BootstrapButton>
    );
}

export default function ServiceActionBar() {
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
        <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className=" fs-4 font-semibold mb-2">Action Bar</div>
                {/* <Link href='#'>
                    {loadingButton === 'allServiceCategory' ? (<ButtonLoading />) : (<BootstrapButton
                        variant="outline-warning"
                        onClick={() => handleClick("allServiceCategory")}
                        onMouseEnter={() => handleMouseEnter("allServiceCategory")}
                        onMouseLeave={handleMouseLeave}
                        style={getButtonStyle("allServiceCategory")}
                    >
                        'All Service Category <FiBell className="ml-2" />
                    </BootstrapButton>)}

                </Link> */}
            </div>
            <div className="flex space-x-3 mt-2">
                {/* <Link href='#'>
                    {loadingButton === "allServices" ? (<ButtonLoading />) : (<BootstrapButton
                        variant="outline-warning"
                        onClick={() => handleClick("allServices")}
                        onMouseEnter={() => handleMouseEnter("allServices")}
                        onMouseLeave={handleMouseLeave}
                        style={getButtonStyle("allServices")}
                    >
                        All Services <FiBell className="ml-2" />
                    </BootstrapButton>)}

                </Link> */}

                <Link href='/admin/services/new-service' style={{ textDecoration: "none" }}>
                    {loadingButton === 'addNewService' ? (
                        <ButtonLoading />
                    ) : (
                        <BootstrapButton
                            variant="outline-warning"
                            onClick={() => handleClick("addNewService")}
                            onMouseEnter={() => handleMouseEnter("addNewService")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("addNewService")}
                        >
                            Add New Service <RiServiceLine  className="ml-2" />
                        </BootstrapButton>
                    )}
                </Link>
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
        </div >
    );
}
