'use client';

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, LocalHospital, Work, CalendarToday, Edit, BarChart, Apartment } from '@mui/icons-material';
import Image from 'next/image';
import logo from "../../../public/logo.jpg";

const drawerWidth = 200;

const SidePanel = ({ open }: any) => {
  return (
    <Drawer
      variant="permanent"
      style={{
        width: open ? drawerWidth : 60,
        transition: 'width 0.3s',
        background: "#fff",
        position: 'fixed',
        top: 30,
        left: 30,
        height: 'calc(100% - 180px)',
        borderRadius: "30px"
      }}
      PaperProps={{
        style: {
          width: open ? drawerWidth : 60,
          overflowX: 'hidden',
          transition: 'width 0.3s',
          background: "#fff",
          position: 'relative',
          height: '100%',
          borderRadius: "30px"
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
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
        //   { text: 'Organization', icon: <Apartment /> },
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            className='listItem'
          >
            <ListItemIcon className='listItemIcon'>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} style={{ display: open ? 'block' : 'none' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidePanel;
