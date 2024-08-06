import React from 'react';

const Stats = () => {
  const stats = [
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
    { value: '324', label: 'Appointments this month', icon: '👥' },
    { value: '22', label: 'Certified Consultants', icon: '👨‍⚕️' },
    { value: '4000', label: 'Registered Users', icon: '👥' },
  ];

  return (
    <>
      <div className="stats-container">
        <div className="stats-wrapper">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card">
              <div className="stats-content">
                <div className="stats-value" style={{ color: "#2C297E" }}>{stat?.value}</div>
                <div className="stats-icon">{stat.icon}</div>
              </div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stats;
