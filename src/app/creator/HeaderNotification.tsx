'use client';

import React, { useState } from 'react';
import { Card } from '@mui/material';
import Link from 'next/link';

type Notification = {
  isRead: boolean;
  title: string;
  description: string;
  image: string;
};

type HeaderNotificationCardProps = {
  title: string;
  notifications: Notification[];
};

const HeaderNotificationCard: React.FC<HeaderNotificationCardProps> = ({ title, notifications }) => {

   const [filter, setFilter] = useState<'all' | 'unread'>('unread');

   // Handle filter change
   const handleFilterChange = (newFilter: 'all' | 'unread') => {
     setFilter(newFilter);
   };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return false;
  });

  return (
    <div className="header-notification-card">
      <div style={{ paddingLeft: "15px", display: "flex", flexDirection: "column" }}>
        <div className="notification-card-header">
          <h2 className="header-notification-card-title">Notifications</h2>
          <div style={{ padding: "5px 20px", border: "1px dashed #ff6600", borderRadius: "8px" }}>
            <Link href="#" className="see-all">See All</Link>
          </div>
        </div>
        <div className="header-notification-filters">
          <button
            className={`filter-button ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => handleFilterChange('unread')}
          >
            Unread
          </button>
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
        </div>
      </div>
      <div className='notification-box'>
        {filteredNotifications.map((notification, index) => (
          <Card key={index} className="notification-item">
            <img src={notification.image} alt="Profile" className="notification-image" />
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeaderNotificationCard;
