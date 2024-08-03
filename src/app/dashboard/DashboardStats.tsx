import React from 'react';

const DashboardStats = ({ isPanelHovered }: any) => {
  const stats = [
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '40', label: 'Blog Posts', icon: '📝' },
    { value: '383,821 Rs.', label: 'Earning this Month', icon: '💰' },
    { value: '10.4 M Rs.', label: 'Total Earnings till Now', icon: '🏦' },
  ];

  return (
    <>
      <h1 className="mb-4" style={{
        marginLeft: "130px",
        transform: isPanelHovered ? 'translateX(150px)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        fontSize: "1.5rem"
      }}>
        Welcome Back, <span style={{ color: '#ff6600' }}>Kanika</span>
      </h1>
      <div className="dashboard-container" style={{ display: isPanelHovered ? 'none' : 'flex' }}>
        <div className="stats-row">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-value" style={{color: "#2C297E"}}>{stat?.value}</div>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
