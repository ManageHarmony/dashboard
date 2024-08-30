'use client';

import { Poppins } from 'next/font/google'
import { useState } from "react";
import { usePathname } from "next/navigation";
import SidePanel from "./SidePanel";
import DashboardHeader from "./DashboardHeader";
import Link from "next/link";

import './dashboard.css';
import './customScrollbar.css';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isPanelHovered, setIsPanelHovered] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const pathname = usePathname();

    // Function to generate the page title and breadcrumb based on the route
    const generatePageInfo = (pathname: string) => {
        const pathParts = pathname.split('/').filter(Boolean); // Split and filter out empty parts
        // console.log("--->", pathParts)

        // Custom heading for specific routes
        let pageTitle;
        if (pathname === '/admin/content/newCategory') {
            pageTitle = 'New Category';
        } else if (pathname === '/admin/services/new-service') {
            pageTitle = 'New Service';
        } else if (pathname === '/admin/services/new-service-category') {
            pageTitle = 'New Service Category';
        } else if (pathname === '/admin/content/allblogs') {
            pageTitle = 'All Blogs'


        }
        else if (pathname.startsWith('/admin/content/allblogs/')) {
            const lastPart = pathParts[pathParts.length - 1];
            pageTitle = 'Blog ' + lastPart?.charAt(0).toUpperCase() + lastPart?.slice(1);}
        else {
            pageTitle = pathParts[pathParts.length - 1]?.charAt(0).toUpperCase() + pathParts[pathParts.length - 1]?.slice(1);
        }

        const breadcrumb = pathParts.map((part, index) => {
            const path = '/' + pathParts.slice(0, index + 1).join('/');
            return (
                <span key={path} className="breadcrumb-item">
                    <Link href={path}>{part.charAt(0).toUpperCase() + part.slice(1)}</Link>
                    {index < pathParts.length - 1 && <span className="breadcrumb-separator"></span>}
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
                <main className={poppins.className}>
                    <SidePanel
                        onPanelHover={handlePanelHover}
                        isPanelHovered={isPanelHovered}
                    />
                    <DashboardHeader
                        isPanelHovered={isPanelHovered}
                        onShowNotifications={handleShowNotifications}
                        showNotifications={showNotifications}
                        onShowDropdown={handleShowDropdown}
                        showDropdown={showDropdown}
                    />

                    <div
                        style={{
                            marginLeft: "7%",
                            filter: isPanelHovered || showNotifications || showDropdown ? 'blur(3px)' : 'none',
                            transition: 'filter 0.2s ease-in-out'
                        }}
                    >
                        <div className="page-info" style={{ marginLeft: "20px" }}>
                            {pathname === '/admin' ? (
                                <div className="welcome-container">
                                    <h1 className="mb-4" style={{ fontSize: "1.5rem" }}>
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

                        {children}

                    </div>
                </main>
            </body>
        </html>
    );
}
