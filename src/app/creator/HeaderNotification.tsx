// HeaderNotificationCard.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@mui/material';

type Notification = {
    title: string;
    description: string;
    image: string;
};

type HeaderNotificationCardProps = {
    title: string;
    notifications: Notification[];
};

const HeaderNotificationCard: React.FC<HeaderNotificationCardProps> = ({ title, notifications }) => {
    return (
        <div className="header-notification-card">
            <div className="notification-card-header">
                <h2 className="header-notification-card-title">{title}</h2>
                <div style={{padding:"5px 20px", border: "1px dashed #ff6600",borderRadius: "8px", marginBottom: "10px"}}><a href="#" className="see-all">See All</a></div>
            </div>
            <div className="header-notification-filters">
                <button className="filter-button active">All</button>
                <button className="filter-button mx-2">Unread</button>
            </div>
            {notifications.map((notification, index) => (

                <Card key={index} className="notification-item">
                    <img src={notification.image} alt="Profile" className="notification-image" />
                    <div className="notification-content">
                        <h3>{notification.title}</h3>
                        <p>{notification.description}</p>
                    </div>
                </Card>

            ))}
        </div>
    );
};

export default HeaderNotificationCard;
