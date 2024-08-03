'use client';


import Heading from './Heading';
import RatingsAndWords from './RatingsAndWords';
import RecentTicketsOrg from './RecentTicketsOrg';




export default function Organization() {

    return (
       <>
       <div style={{marginLeft: "120px"}}>
       <Heading />
       </div>
         <div className="dashboard-grid-container" >
            <div>
                <RatingsAndWords />
            </div>
            <div>
                <RecentTicketsOrg />
            </div>

        </div>
       </>
    );
}
