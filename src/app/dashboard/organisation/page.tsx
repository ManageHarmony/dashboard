// Organization.tsx

'use client';


import RatingsAndWords from './RatingsAndWords';
import RecentTicketsOrg from './RecentTicketsOrg';
import UserNotifications from './UserNotification';
import DoctorNotifications from './DoctorNotification';

export default function Organization() {
    return (
        <>
            <div className="dashboard-grid-container">
                <div>
                    <RatingsAndWords />
                </div>
                <div>
                    <RecentTicketsOrg />
                </div>
            </div>
            <div className="notifications-container">
                <UserNotifications />
                <DoctorNotifications />
            </div>
        </>
    );
}
