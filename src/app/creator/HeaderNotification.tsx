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
          <button
              className='see-all'
            >
              See All
              <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }} width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M8 2.875H2.75C2.28587 2.875 1.84075 3.07254 1.51256 3.42417C1.18437 3.77581 1 4.25272 1 4.75V14.125C1 14.6223 1.18437 15.0992 1.51256 15.4508C1.84075 15.8025 2.28587 16 2.75 16H11.5C11.9641 16 12.4092 15.8025 12.7374 15.4508C13.0656 15.0992 13.25 14.6223 13.25 14.125V8.5" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12.6504L12.875 4.21289" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.625 1H15V5.6875" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
