'use client';

import React, { useState } from 'react';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import profilePic from "../../../public/assets/avatar.jpg";
import HeaderNotificationCard from './HeaderNotification';
import { ChevronDownIcon } from '@radix-ui/react-icons';

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

  const [showCard, setShowCard] = useState(false);

  const handleButtonClick = () => {
    setShowCard(!showCard);
    onShowDropdown(!showDropdown); // Toggle dropdown state
  };

  const handleNotificationClick = () => {
    onShowNotifications(!showNotifications);
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
          />
          <span className="mx-1" style={{ color: '#000', fontWeight: 'bold' }}>Kanika</span>
          <div className="relative">
            {/* Button with Dropdown Icon */}
            <button
              onClick={handleButtonClick}
              className="rounded-full flex items-center"
            >
              <ChevronDownIcon />
            </button>

            {/* Dropdown Card */}
            {showCard && (
              <div className="custom-dropdown dropdown-card absolute top-8 right-5 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
                <a href="#profile" className="dropdown-item flex items-center py-2 px-3">
                  <FaUser className="me-2" /> My Profile
                </a>
                <a href="#settings" className="dropdown-item flex items-center py-2 px-3">
                  <FaCog className="me-2" /> Settings
                </a>
                <hr className="my-2" />
                <a href="#logout" className="dropdown-item flex items-center py-2 px-3">
                  <FaSignOutAlt className="me-2" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardHeader;
