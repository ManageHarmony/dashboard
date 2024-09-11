'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import logo from '../../../public/logo.jpg';
import ContentIcon from '@/components/icons/ContentIcon';
import DashboardIcon from '@/components/icons/DashboardIcon';
import OrganizationIcon from '@/components/icons/OrganizationIcon';
import StaffIcon from '@/components/icons/StaffIcon';
import DoctorsIcon from '@/components/icons/DoctorsIcon';
import ServicesIcon from '@/components/icons/ServicesIcon';
import AppointmentsIcon from '@/components/icons/AppointmentsIcon';
import StatsIcon from '@/components/icons/StatsIcon';

const drawerWidth = 240;

interface SidePanelProps {
  onPanelHover: (hovered: boolean) => void;
  isPanelHovered: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ onPanelHover, isPanelHovered }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current URL path

  const handleNavigation = (href: string) => {
    onPanelHover(false);
    router.push(href);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon hovered={hoveredItem === '/manager'} selected={pathname === '/manager'} />, href: '/manager' },
    { text: 'Staff', icon: <StaffIcon hovered={hoveredItem === '/manager/staff'} selected={pathname === '/manager/staff'} />, href: '/manager/staff' },
    { text: 'Doctors', icon: <DoctorsIcon hovered={hoveredItem === '/manager/doctors'} selected={pathname === '/manager/doctors'} />, href: '/manager/doctors' },
    { text: 'Services', icon: <ServicesIcon hovered={hoveredItem === '/manager/services'} selected={pathname === '/manager/services'} />, href: '/manager/services' },
    { text: 'Appointments', icon: <AppointmentsIcon hovered={hoveredItem === '/manager/appointments'} selected={pathname === '/manager/appointments'} />, href: '/manager/appointments' },
    { text: 'Content', icon: <ContentIcon hovered={hoveredItem === '/manager/content'} selected={pathname === '/manager/content'} />, href: '/manager/content' },
    { text: 'Stats', icon: <StatsIcon hovered={hoveredItem === '/manager/stats'} selected={pathname === '/manager/stats'} />, href: '/manager/stats' },
    { text: 'Organization', icon: <OrganizationIcon hovered={hoveredItem === '/manager/organisation'} selected={pathname === '/manager/organisation'} />, href: '/manager/organisation' },
  ];

  return (
    <div
      onMouseEnter={() => onPanelHover(true)}
      onMouseLeave={() => onPanelHover(false)}
      style={{
        width: isPanelHovered ? `${drawerWidth}px` : '70px',
        transition: 'width 0.3s',
        background: "#fff",
        position: 'fixed',
        top: '35px',
        left: '30px',
        height: 'calc(100% - 100px)',
        borderRadius: "30px",
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isPanelHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"
      }}
    >
      <div className="logoContainer">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        {menuItems.map((item) => (
          <li
            key={item.text}
            onClick={() => handleNavigation(item.href)}
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`listItem ${pathname === item.href ? 'selected' : ''}`}
            style={{
              height: isPanelHovered ? '50px' : 'auto',
            }}
          >
            <div className="listItemContent">
              <span className={isPanelHovered ? 'listItemTextOpen' : 'listItemText'}>
                {item.text}
              </span>
              <div className={`listItemIcon ${pathname === item.href ? 'selected' : ''}`}>
                {item.icon}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanel;
