import Link from "next/link";
import { Button as BootstrapButton } from "react-bootstrap";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";

// Button Loading Component
export function ButtonLoading() {
    return (
        <BootstrapButton disabled style={{ backgroundColor: '#fff', border: "1px dashed orange", width: "auto", color: "#ff6600", display: "flex", alignItems: "center" }}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait...</span>
        </BootstrapButton>
    );
}

export default function ActionBarDoctors() {
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
        <div style={{ backgroundColor: "#fff", padding: "10px 15px", borderRadius: "10px", marginBottom: "20px", width: "100%" }}>
            <div className="action-bar text-lg font-semibold mb-2">Action Bar</div>
            <div className="flex space-x-3">
                <Link href='/admin/doctors/consultantData' style={{ textDecoration: "none" }}>
                    {loadingButton === 'Consultants' ? (
                        <ButtonLoading />
                    ) : (
                        <BootstrapButton
                            variant="outline-warning"
                            onClick={() => handleClick("Consultants")}
                            onMouseEnter={() => handleMouseEnter("Consultants")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("Consultants")}
                        >
                            All Consultants <FaUserDoctor className="ml-2 fs-5" />
                        </BootstrapButton>
                    )}
                </Link>
                <Link href='#' style={{ textDecoration: "none" }}>
                    {loadingButton === 'doctors' ? (
                        "Not working"
                    ) : (
                        <BootstrapButton
                            variant="outline-warning"
                            onClick={() => handleClick("doctors")}
                            onMouseEnter={() => handleMouseEnter("doctors")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("doctors")}
                        >
                            Add Doctors <FaUserDoctor className="ml-2 fs-5" />
                        </BootstrapButton>
                    )}
                </Link>
                <Link href='#' style={{ textDecoration: "none" }}>
                    {loadingButton === 'pendings' ? (
                        "Not working"
                    ) : (
                        <BootstrapButton
                            variant="outline-warning"
                            onClick={() => handleClick("pendings")}
                            onMouseEnter={() => handleMouseEnter("pendings")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("pendings")}
                        >
                            View Pendings <FaUserDoctor className="ml-2 fs-5" />
                        </BootstrapButton>
                    )}
                </Link>
            </div>
        </div>
    )
}