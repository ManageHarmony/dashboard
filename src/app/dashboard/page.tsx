'use client'

import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import RecentTickets from './RecentTickets';
import SidePanel from './SidePanel';
import TopConsultants from './TopConsultants';
import DashboardStats from './DashboardStats';

export default function Dashboard() {
  const [isPanelHovered, setIsPanelHovered] = useState(false);

  const handlePanelMouseEnter = () => {
    setIsPanelHovered(true);
  };

  const handlePanelMouseLeave = () => {
    setIsPanelHovered(false);
  };

  return (
    <>
      <div 
        onMouseEnter={handlePanelMouseEnter} 
        onMouseLeave={handlePanelMouseLeave}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <SidePanel open={isPanelHovered} />
      </div>
      <DashboardHeader />
      <DashboardStats isPanelHovered={isPanelHovered} />
      <div 
        className="dashboard-grid-container" 
        style={{ 
          opacity: isPanelHovered ? 0 : 1, 
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div>
          <RecentTickets />
        </div>
        <div>
          <TopConsultants />
        </div>
      </div>
    </>
  );
}
