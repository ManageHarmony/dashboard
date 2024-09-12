'use client';

import React, { useState } from 'react';

import RecentTickets from './RecentTickets';

import TopConsultants from './RecentBlogs';
import DashboardStats from './DashboardStats';
import DynamicChart from './DynamicChart';
import TopSessions from './TopSessions';

import './customScrollbar.css'; // Import custom scrollbar styles
import 'bootstrap/dist/css/bootstrap.min.css';
import WaveChart from './WaveChart';
import RecentBlogs from './RecentBlogs';


export default function Dashboard({ sampleData }: any) {

  return (

    <div style={{ width: '100%' }}>

      <DashboardStats />
      <div className="dashboard-grid-container" >
        <div className='d-flex align-center justify-center'>
          <DynamicChart />

        </div>
        <div>
          <WaveChart />
        </div>
        <div>
          <RecentBlogs />
        </div>
       
        <div>
          <TopSessions />
        </div>
      </div>
    </div>
  );
}
