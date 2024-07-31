'use client';

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, LocalHospital, Work, CalendarToday, Edit, BarChart } from '@mui/icons-material';
import Image from 'next/image';
import logo from "../../../public/logo.jpg";

const drawerWidth = 200;

interface SidePanelProps {
  onLogoMouseEnter: () => void;
  onLogoMouseLeave: () => void;
  isPanelHovered: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ onLogoMouseEnter, onLogoMouseLeave, isPanelHovered }) => {
  return (
    <Drawer
      variant="permanent"
      style={{
        width: isPanelHovered ? drawerWidth : 60,
        transition: 'width 0.3s',
        background: "#fff",
        position: 'fixed',
        top: 30,
        left: 30,
        height: 'calc(100% - 180px)',
        borderRadius: "30px",
        zIndex: 1000
      }}
      PaperProps={{
        style: {
          width: isPanelHovered ? drawerWidth : 60,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          background: "#fff",
          position: 'relative',
          height: '100%',
          borderRadius: "30px",
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', padding: '10px 0' }} onMouseEnter={onLogoMouseEnter} 
          onMouseLeave={onLogoMouseLeave}>
        
  
          <Image src={logo} alt="Logo" width={50} height={50} /> 
</div>
      
      <List>
        {[
          { text: 'Dashboard', icon: <Dashboard /> },
          { text: 'Staff', icon: <People /> },
          { text: 'Doctors', icon: <LocalHospital /> },
          { text: 'Services', icon: <Work /> },
          { text: 'Appointments', icon: <CalendarToday /> },
          { text: 'Content', icon: <Edit /> },
          { text: 'Stats', icon: <BarChart /> },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            className='listItem'
          >
            <ListItemIcon className='listItemIcon'>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} style={{ display: isPanelHovered ? 'block' : 'none' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidePanel;
