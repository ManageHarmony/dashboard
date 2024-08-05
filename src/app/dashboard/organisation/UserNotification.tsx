// UserNotifications.tsx

'use client';

import React from 'react';
import NotificationCard from './NotificationCard';

const userNotifications = [
    {
        title: 'Discuss with Us',
        description: 'Let’s Discuss Further How it feels together Don’t Worry we under........',
        image: '/path/to/image.jpg', // Replace with actual image path
    },
    {
        title: 'Smriti Sharma as Doctor',
        description: 'on 60 character break the content and need show .............',
        image: '/path/to/image.jpg',
    },
    {
        title: 'Smriti Sharma as Doctor',
        description: 'is Now Registered on Phoenix and Approved by Jay Rawat',
        image: '/path/to/image.jpg',
    },
    {
        title: 'Smriti Sharma as Doctor',
        description: 'is Now Registered on Phoenix and Approved by Jay Rawat',
        image: '/path/to/image.jpg',
    }
];

const UserNotifications: React.FC = () => {
    return (
        <NotificationCard title="Recent Notifications to Users" notifications={userNotifications} />
    );
};

export default UserNotifications;
