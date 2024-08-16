import React from 'react';
import ContentDynamicChart from './ContentDynamicChart';
import TopArticleContent from './TopArticleContent';
import StaffIcon from '@/components/icons/StaffIcon';

const ContentStats = () => {
  const stats = [
    { value: '324', label: 'Appointment. this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointment. this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
  ];

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", gap: "20px", width: "100%", paddingBottom: "30px" }}>
        <div >
          <div className="stats-wrapper">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-content">
                  <div className="stat-value" style={{ color: "#2C297E" }}>{stat?.value}</div>
                  <div className="stat-icon">{stat.icon}</div>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ContentDynamicChart />
        </div>
        <div>
          <TopArticleContent />
        </div>
      </div>
    </>
  );
};

export default ContentStats;
