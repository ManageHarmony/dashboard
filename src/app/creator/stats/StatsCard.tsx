import React from 'react';

const Stats = () => {
  const stats = [
    { value: '24', label: 'Published Videos', icon: '🎥' },
    { value: '22', label: 'Rejected Blogs', icon: '👨🏻‍💻' },
    { value: '40', label: 'Pending Articles', icon: '📰' },
    { value: '34', label: 'Published Articles', icon: '📰' },
    { value: '22', label: 'Rejected articles', icon: '📰' },
    { value: '4', label: 'Pending Video', icon: '🎥' },
    { value: '32', label: 'Published Blogs', icon: '👨🏻‍💻' },
    { value: '22', label: 'Rejected Videos', icon: '🎥' },
    { value: '40', label: 'Pending Users', icon: '👥' },
    { value: '324', label: 'Published Videos', icon: '🎥' },
    { value: '22', label: 'Rejected Blogs', icon: '👨🏻‍💻' },
    { value: '40', label: 'Pending Blogs', icon: '👥' },
    { value: '32', label: 'Published Videos', icon: '🎥' },
    { value: '22', label: 'Rejected Blogs', icon: '👨🏻‍💻' },
 
  ];

  return (
    <>
      <div className="stats-container-stats">
        <div className="stats-wrapper-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card-stats">
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
