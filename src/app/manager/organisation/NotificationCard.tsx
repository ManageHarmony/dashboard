// NotificationCard.tsx

'use client';

import { Card } from '@mui/material';
import React from 'react';

interface Notification {
    title: string;
    description: string;
    image: string;
}

interface NotificationCardProps {
    title: string;
    notifications: Notification[];
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, notifications }) => {
    return (
        <>
            <div className='notification' style={{marginLeft: "30px"}}>
                <h2 className="notification-card-title">
                    {title} <span className="heading-underline-org"></span>
                </h2>
                <div className="notification-box">
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
            </div>
        </>
    );
};

export default NotificationCard;
