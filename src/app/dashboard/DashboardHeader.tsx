'use client';

import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import profilePic from "../../../public/logo.jpg";
import HeaderNotificationCard from './HeaderNotification';

const DashboardHeader = ({ isPanelHovered, onShowNotifications, showNotifications, onShowDropdown, showDropdown }: any) => {
  const [notifications] = useState([
    {
      title: 'Smriti Sharma as Doctor',
      description: 'is Now Registered on Phoenix and Approved by Jay Rawat',
      image: '/assets/avatar.jpg',
    },
    {
      title: 'Smriti Sharma as Doctor',
      description: 'on 60 character break the content and need show .............',
      image: '/assets/avatar.jpg',
    },
    {
      title: 'Smriti Sharma as Doctor',
      description: 'on 60 character break the content and need show .............',
      image: '/assets/avatar.jpg',
    },
  ]);

  const notificationsCount = notifications.length;

  const handleNotificationClick = () => {
    onShowNotifications(!showNotifications);
  };

  const handleDropdownClick = () => {
    onShowDropdown(!showDropdown);
  };

  return (
    <Navbar bg='transparent' className="d-flex justify-content-between w-100 p-3 header bg-white">
      <Form style={{
        width: '250px',
        marginLeft: "110px",
        transform: isPanelHovered ? 'translateX(160px)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}>
        <FormControl
          type="search"
          placeholder="Search anything..."
          className="me-2 search"
          aria-label="Search"
        />
        <FaSearch
          size={20}
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}
        />
      </Form>
      <div className="d-flex align-items-center">
        <div style={{ position: 'relative', marginRight: '10px' }}>
          <FaBell
            size={40}
            style={{ color: '#000', background: "#fff", borderRadius: '10px', padding: "10px", cursor: 'pointer' }}
            onClick={handleNotificationClick}
          />
          {notificationsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ff6600',
              borderRadius: '50%',
              color: '#fff',
              padding: '1px 5px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>{notificationsCount}</span>
          )}
          {showNotifications && (
            <div className="notifications-dropdown">
              <HeaderNotificationCard title="Notifications" notifications={notifications} />
            </div>
          )}
        </div>
        <div className="d-flex align-items-center bg-transparent">
          <Image
            src={profilePic}
            alt="Profile"
            width={40}
            height={40}
            className=""
            style={{ marginRight: '10px' }}
            onClick={handleDropdownClick}
          />
          <span className="mx-1" style={{ color: '#000', fontWeight: 'bold' }}>Kanika</span>
          <NavDropdown
            title={<span></span>}
            id="basic-nav-dropdown"
            align="end"
            className="custom-dropdown"
            show={showDropdown}
            onToggle={handleDropdownClick}
          >
            <div className="dropdown-card">
              <NavDropdown.Item href="#profile">
                <FaUser className="me-2" /> My Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#settings">
                <FaCog className="me-2" /> Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">
                <FaSignOutAlt className="me-2" /> Logout
              </NavDropdown.Item>
            </div>
          </NavDropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardHeader;
