'use client';

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import logo from '../../../public/logo.jpg'
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
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon hovered={hoveredItem === '/admin'} selected={pathname === '/admin'} />, href: '/admin' },
    { text: 'Staff', icon: <StaffIcon hovered={hoveredItem === '/admin/staff'} selected={pathname === '/admin/staff'} />, href: '/admin/staff' },
    { text: 'Doctors', icon: <DoctorsIcon hovered={hoveredItem === '/admin/doctors'} selected={pathname === '/admin/doctors'} />, href: '/admin/doctors' },
    { text: 'Services', icon: <ServicesIcon hovered={hoveredItem === '/admin/services'} selected={pathname === '/admin/services'} />, href: '/admin/services' },
    { text: 'Appointments', icon: <AppointmentsIcon hovered={hoveredItem === '/admin/appointments'} selected={pathname === '/admin/appointments'} />, href: '/admin/appointments' },
    { text: 'Content', icon: <ContentIcon hovered={hoveredItem === '/admin/content'} selected={pathname === '/admin/content'} />, href: '/admin/content' },
    { text: 'Stats', icon: <StatsIcon hovered={hoveredItem === '/admin/stats'} selected={pathname === '/admin/stats'} />, href: '/admin/stats' },
    { text: 'Organization', icon: <OrganizationIcon hovered={hoveredItem === '/admin/organisation'} selected={pathname === '/admin/organisation'} />, href: '/admin/organisation' },
  ];

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => onPanelHover(true)}
      onMouseLeave={() => onPanelHover(false)}
      style={{
        width: isPanelHovered ? drawerWidth : 70,
        transition: 'width 0.3s',
        background: "#fff",
        position: 'fixed',
        top: 35,
        left: 30,
        height: 'calc(100% - 70px)',
        borderRadius: "30px",
        zIndex: 1000,
      }}
      PaperProps={{
        style: {
          width: isPanelHovered ? drawerWidth : 70,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          background: "#fff",
          position: 'relative',
          height: '100%',
          borderRadius: "30px",
        }
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
        <div className="logoContainer">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`listItem ${pathname === item.href ? 'selected' : ''}`}
            >
              <ListItemText
                primary={item.text}
                className={isPanelHovered ? 'listItemTextOpen' : 'listItemText'}
              />
              <ListItemIcon className={`listItemIcon ${pathname === item.href ? 'selected' : ''}`}>
                {item.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SidePanel;
