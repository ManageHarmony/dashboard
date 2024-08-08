import React from 'react';
import DoctorApplication from './DoctorApplication';
import DoctorRatings from './DoctorRatings';


const DoctorsPage: React.FC = () => {
  return (
    <div>
      <div className="dashboard-grid-container" >
                <div>
                    <DoctorRatings />
                </div>
                <div>
                    <DoctorApplication />
                </div>

            </div>
    </div>
  );
};

export default DoctorsPage;
