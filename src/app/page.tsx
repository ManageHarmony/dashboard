'use client'

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { RiAdminLine } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
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

export default function Home() {

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
    border: "1px solid orange",
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
      <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "80%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Link href='/admin' style={{ textDecoration: "none" }}> {loadingButton === 'Admin' ? (
            <ButtonLoading />
          ) : (
            <BootstrapButton
              variant="outline-warning"
              onClick={() => handleClick("Admin")}
              onMouseEnter={() => handleMouseEnter("Admin")}
              onMouseLeave={handleMouseLeave}
              style={getButtonStyle("Admin")}
            >
              Admin <RiAdminLine className="ml-2 fs-5" />
            </BootstrapButton>
          )}</Link>
          <Link href='/manager' style={{ textDecoration: "none" }}> {loadingButton === 'manager' ? (
            <ButtonLoading />
          ) : (
            <BootstrapButton
              variant="outline-warning"
              onClick={() => handleClick("manager")}
              onMouseEnter={() => handleMouseEnter("manager")}
              onMouseLeave={handleMouseLeave}
              style={getButtonStyle("manager")}
            >
              Manager <GrUserManager className="ml-2 fs-5" />
            </BootstrapButton>
          )}</Link>
          <Link href='/creator' style={{ textDecoration: "none" }}> {loadingButton === 'creator' ? (
            <ButtonLoading />
          ) : (
            <BootstrapButton
              variant="outline-warning"
              onClick={() => handleClick("creator")}
              onMouseEnter={() => handleMouseEnter("creator")}
              onMouseLeave={handleMouseLeave}
              style={getButtonStyle("creator")}
            >
              Creator <GrUserManager className="ml-2 fs-5" />
            </BootstrapButton>
          )}</Link>
          <Link href='/consultants' style={{ textDecoration: "none" }}> {loadingButton === 'consultants' ? (
            <ButtonLoading />
          ) : (
            <BootstrapButton
              variant="outline-warning"
              onClick={() => handleClick("consultants")}
              onMouseEnter={() => handleMouseEnter("consultants")}
              onMouseLeave={handleMouseLeave}
              style={getButtonStyle("consultants")}
            >
              All Consultants <FaUserDoctor className="ml-2 fs-5" />
            </BootstrapButton>
          )}</Link>
        </div>
      </div>
    </>
  );
}
