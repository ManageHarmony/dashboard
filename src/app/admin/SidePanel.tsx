'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/admin') {
      setSelectedItem('/admin');
    } else {
      setSelectedItem(null);
    }
  }, []);

  const handleNavigation = (href: string) => {
    setSelectedItem(href);
    onPanelHover(false);
    router.push(href);
  };

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
        
      }}
    >
      <div className="logoContainer">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 , height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
        {[
          { text: 'Dashboard', icon: <DashboardIcon hovered={hoveredItem === '/admin'} selected={selectedItem === '/admin'} />, href: '/admin' },
          { text: 'Staff', icon: <StaffIcon hovered={hoveredItem === '/admin/staff'} selected={selectedItem === '/admin/staff'} />, href: '/admin/staff' },
          { text: 'Doctors', icon: <DoctorsIcon hovered={hoveredItem === '/admin/doctors'} selected={selectedItem === '/admin/doctors'} />, href: '/admin/doctors' },
          { text: 'Services', icon: <ServicesIcon hovered={hoveredItem === '/admin/services'} selected={selectedItem === '/admin/services'} />, href: '/admin/services' },
          { text: 'Appointments', icon: <AppointmentsIcon hovered={hoveredItem === '/admin/appointments'} selected={selectedItem === '/admin/appointments'} />, href: '/admin/appointments' },
          { text: 'Content', icon: <ContentIcon hovered={hoveredItem === '/admin/content'} selected={selectedItem === '/admin/content'} />, href: '/admin/content' },
          { text: 'Stats', icon: <StatsIcon hovered={hoveredItem === '/admin/stats'} selected={selectedItem === '/admin/stats'} />, href: '/admin/stats' },
          { text: 'Organization', icon: <OrganizationIcon hovered={hoveredItem === '/admin/organisation'} selected={selectedItem === '/admin/organisation'} />, href: '/admin/organisation' },
        ].map((item) => (
          <li
          key={item.text}
          onClick={() => handleNavigation(item.href)}
          onMouseEnter={() => setHoveredItem(item.href)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`listItem ${selectedItem === item.href ? 'selected' : ''}`}
          style={{
            height: isPanelHovered ? '50px' : 'auto',
          }}
        >
          <div className="listItemContent">
            <span className={isPanelHovered ? 'listItemTextOpen' : 'listItemText'}>
              {item.text}
            </span>
            <div className={`listItemIcon ${selectedItem === item.href ? 'selected' : ''}`}>
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
