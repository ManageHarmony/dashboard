'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/creator') {
      setSelectedItem('/creator');
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
   <div style={{display: "flex", flexDirection: "column",justifyContent:"center", width: "100%"}}>
   <div className="logoContainer">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>

      <List>
          {[
            {
              text: 'Dashboard', icon: <DashboardIcon
                hovered={hoveredItem === '/creator'}
                selected={selectedItem === '/creator'}
              />, href: '/creator'
            },
            {
              text: 'Staff', icon: <StaffIcon
                hovered={hoveredItem === '/creator/staff'}
                selected={selectedItem === '/creator/staff'}
              />, href: '/creator/staff'
            },
            {
              text: 'Doctors', icon: <DoctorsIcon
                hovered={hoveredItem === '/creator/doctors'}
                selected={selectedItem === '/creator/doctors'}
              />, href: '/creator/doctors'
            },
            {
              text: 'Services', icon: <ServicesIcon
                hovered={hoveredItem === '/creator/services'}
                selected={selectedItem === '/creator/services'}
              />, href: '/creator/services'
            },
            {
              text: 'Appointments', icon: <AppointmentsIcon
                hovered={hoveredItem === '/creator/appointments'}
                selected={selectedItem === '/creator/appointments'}
              />, href: '/creator/appointments'
            },
            {
              text: 'Content', icon: <ContentIcon
                hovered={hoveredItem === '/creator/content'}
                selected={selectedItem === '/creator/content'}
              />, href: '/creator/content'
            },
            {
              text: 'Stats', icon: <StatsIcon
                hovered={hoveredItem === '/creator/stats'}
                selected={selectedItem === '/creator/stats'}
              />, href: '/creator/stats'
            },
            {
              text: 'Organization', icon: <OrganizationIcon
                hovered={hoveredItem === '/creator/organisation'}
                selected={selectedItem === '/creator/organisation'}
              />, href: '/creator/organisation'
            },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`listItem ${selectedItem === item.href  ? 'selected' : ''}`}
            >
              <ListItemText
                primary={item.text}
                className={isPanelHovered ? 'listItemTextOpen' : 'listItemText'}
              />
              <ListItemIcon className={`listItemIcon ${selectedItem === item.href  ? 'selected' : ''}`}>
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
