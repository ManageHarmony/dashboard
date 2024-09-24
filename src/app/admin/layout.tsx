'use client';

import { Poppins } from 'next/font/google'
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SidePanel from "./SidePanel";
import DashboardHeader from "./DashboardHeader";
import Link from "next/link";

import './dashboard.css';
import './customScrollbar.css';
import { Spinner } from 'react-bootstrap';

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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    

    useEffect(() => {
        const authStatus = localStorage.getItem('admin_isAuthenticated');
        if (authStatus !== 'true') {
            router.push('/adminLogin');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    // Function to generate the page title and breadcrumb based on the route
    const generatePageInfo = (pathname: string) => {
        const pathParts = pathname.split('/').filter(Boolean); // Split and filter out empty parts
        let pageTitle;
        if (pathname === '/admin/content/newCategory') {
            pageTitle = 'New Category';
        } else if (pathname === '/admin/services/new-service') {
            pageTitle = 'New Service';
        } else if (pathname === '/admin/doctors/consultantData') {
            pageTitle = 'Consultant Data';
        } else if (pathname === '/admin/services/new-service-category') {
            pageTitle = 'New Service Category';
        } else if (pathname === '/admin/content/allblogs') {
            pageTitle = 'All Blogs'
        } else if (pathname === '/admin/content/allVideos') {
            pageTitle = 'All Videos'
        } else if (pathname === '/admin/content/allArticles') {
            pageTitle = 'All Articles'
        } else if (pathname === '/admin/staff/addCreator') {
            pageTitle = 'Add Creator'
        } else if (pathname === '/admin/staff/addManager') {
            pageTitle = 'Add Manager'
        } else if (pathname === '/admin/consultantData') {
            pageTitle = 'All Consultants'
        } else if (pathname === '/admin/recentTickets') {
            pageTitle = 'All Tickets'
        } else if (pathname === '/admin/sessionData') {
            pageTitle = 'All Sessions'
        } else if (pathname === '/admin/doctors/allApplications') {
            pageTitle = 'All Applications'
        } else if (pathname === '/admin/doctors/allDoctors') {
            pageTitle = 'All Doctors'
        } else if (pathname === '/admin/doctors/allRatings') {
            pageTitle = 'All Ratings'
        } else if (pathname === '/admin/organisation/recentTickets') {
            pageTitle = 'All Tickets'
        } else if (pathname === '/admin/organisation/allRatingsAndWords') {
            pageTitle = 'All Ratings and Words'
        } else {
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

    if (!isAuthenticated) {
        return (
            <div className='vh-100 d-flex items-center justify-content-center'>
                <Spinner />
            </div>
        )
    }


    return (
        <html lang="en">
            <body>
                <main className={poppins.className}>
                    <SidePanel
                        onPanelHover={handlePanelHover}
                        isPanelHovered={isPanelHovered}
                    />
                    <DashboardHeader

                        onShowNotifications={handleShowNotifications}
                        showNotifications={showNotifications}
                        onShowDropdown={handleShowDropdown}
                        showDropdown={showDropdown}
                    />

                    <div
                        style={{
                            marginLeft: "7%",
                            // filter: isPanelHovered ? 'blur(3px)' : 'none',
                            // transition: 'filter 0.2s ease-in-out'
                        }}
                    >
                        <div className="page-info" style={{ marginLeft: "20px" }}>
                            {pathname === '/admin' ? (
                                <div className="welcome-container">
                                    <h1 className="mb-4" style={{ fontSize: "1.5rem" }}>
                                        Welcome Back, <span style={{ color: '#ff6600' }}>Shubham</span>
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
