import React from 'react';
import StaffIcon from '@/components/icons/StaffIcon';


const DoctorStats = () => {
  const stats = [
    { value: '324', label: 'Approved Doctors', icon: <StaffIcon hovered={false} selected={false} /> },
    { value: '22', label: 'Pending Doctors', icon: <StaffIcon hovered={false} selected={false} /> },
    { value: '4000', label: 'Total Doctors', icon: <StaffIcon hovered={false} selected={false} /> },
  ];

  return (
    <>
      <div style={{width: "100%"}}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{width: "200px"}}>
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

export default DoctorStats;
