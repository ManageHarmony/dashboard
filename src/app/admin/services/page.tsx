import React from 'react';
import TopPicks from './TopPicks';
import TopCategories from './TopCategories';


const ServicesPage: React.FC = () => {
    return (
        <div>

            
            <div className="dashboard-grid-container" >
                <div>
                    <TopPicks />
                </div>
                <div>
                    <TopCategories />
                </div>

            </div>
        </div>
    
  );
};

export default ServicesPage;
