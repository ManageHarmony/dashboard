'use client';

import { useState } from "react";
import SidePanel from "./SidePanel";
import DashboardHeader from "./DashboardHeader";


import '../dashboard/dashboard.css'
import '../dashboard/customScrollbar.css'



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    const [isPanelHovered, setIsPanelHovered] = useState(false);

    const handlePanelHover = (hovered: boolean) => {
        setIsPanelHovered(hovered);
    };

    return (
        <html lang="en">
            <body>
                <SidePanel
                    onPanelHover={handlePanelHover}
                    isPanelHovered={isPanelHovered} 
                    />
                   
                <DashboardHeader isPanelHovered={isPanelHovered} />
              
                <div style={{ display: isPanelHovered ? 'none' : 'block', marginLeft: "120px" }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
