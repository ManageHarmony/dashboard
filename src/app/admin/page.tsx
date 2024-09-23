'use client';

import React, { useState } from 'react';

import RecentTickets from './RecentTickets';

import TopConsultants from './TopConsultants';
import DashboardStats from './DashboardStats';
import DynamicChart from './DynamicChart';
import TopSessions from './TopServices';

import './customScrollbar.css'; // Import custom scrollbar styles
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogCarousel from './BlogCarousel';


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
          {/* <div>
            <DynamicChart />
          </div> */}
          <div>
            <TopSessions />
          </div>
        </div>
        <BlogCarousel />
      </div>
  );
}
