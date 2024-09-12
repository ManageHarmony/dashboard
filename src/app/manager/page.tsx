'use client';

import React, { useState } from 'react';

import RecentTickets from './RecentTickets';

import TopConsultants from './TopArticles';
import DashboardStats from './DashboardStats';
import DynamicChart from './TopYtContent';
import TopSessions from './TopBlogs';

import './customScrollbar.css'; // Import custom scrollbar styles
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Dashboard({sampleData} : any) {

  return (
     
      <div style={{ width: '100%' }}>
        
        <DashboardStats />
        <div className="dashboard-grid-container" >
          <div>
            <RecentTickets />
          </div>
          <div>
            <TopConsultants />
          </div>
          <div>
            <DynamicChart />
          </div>
          <div>
            <TopSessions />
          </div>
        </div>
      </div>
  );
}
