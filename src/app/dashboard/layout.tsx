'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { useState } from "react";
import { usePathname } from "next/navigation";
import SidePanel from "./SidePanel";
import DashboardHeader from "./DashboardHeader";
import Link from "next/link";

import './dashboard.css';
import './customScrollbar.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isPanelHovered, setIsPanelHovered] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
    const pathname = usePathname();

    // Function to generate the page title and breadcrumb based on the route
    const generatePageInfo = (pathname: string) => {
        const pathParts = pathname.split('/').filter(Boolean); // Split and filter out empty parts
        const pageTitle = pathParts[pathParts.length - 1]?.charAt(0).toUpperCase() + pathParts[pathParts.length - 1]?.slice(1);

        const breadcrumb = pathParts.map((part, index) => {
            const path = '/' + pathParts.slice(0, index + 1).join('/');
            return (
                <span key={path}>
                    <Link href={path}>{part.charAt(0).toUpperCase() + part.slice(1)}</Link>
                    {index < pathParts.length - 1 && ' > '}
                </span>
            );
        });

        return { pageTitle, breadcrumb };
    };

    const { pageTitle, breadcrumb } = generatePageInfo(pathname);

    const handlePanelHover = (hovered: boolean) => {
        setIsPanelHovered(hovered);
    };

    const handleShowNotifications = (show: boolean) => {
        setShowNotifications(show);
    };

    const handleShowDropdown = (show: boolean) => {
        setShowDropdown(show);
    };

    return (
        <html lang="en">
            <body>
                <SidePanel
                    onPanelHover={handlePanelHover}
                    isPanelHovered={isPanelHovered}
                />
                <DashboardHeader
                    isPanelHovered={isPanelHovered}
                    onShowNotifications={handleShowNotifications}
                    showNotifications={showNotifications}
                    onShowDropdown={handleShowDropdown} // Pass the handler
                    showDropdown={showDropdown} // Pass the state
                />

                <div style={{ display: isPanelHovered || showNotifications || showDropdown ? 'none' : 'block', marginLeft: "7.6%" }}>
                    <div className="page-info " style={{marginLeft: "20px"}}>
                        {pathname === '/dashboard' ? (
                            <div className="welcome-container">
                                <h1 className="mb-4" style={{
                                    transform: isPanelHovered ? 'translateX(150px)' : 'translateX(0)',
                                    transition: 'transform 0.3s ease-in-out',
                                    fontSize: "1.5rem"
                                }}>
                                    Welcome Back, <span style={{ color: '#ff6600' }}>Kanika</span>
                                </h1>
                            </div>
                        ) : (
                            <>
                                <div className="heading-container">
                                    <h1>{pageTitle}</h1>
                                    <div className="heading-underline"></div>
                                </div>
                                <div className="breadcrumb">
                                    {breadcrumb}
                                </div>
                            </>
                        )}
                    </div>
                    <AppRouterCacheProvider>
                        {children}
                    </AppRouterCacheProvider>
                </div>
            </body>
        </html>
    );
}
