import ContentActionBar from "./ContentActionBar";
import ContentStats from "./ContentStats";



export default function Appointments () {
    return (
        <>
         
         <div className="dashboard-grid-container" >
                <div>
                    <ContentStats />
                </div>
                <div>
                    <ContentActionBar />
                </div>

            </div>
        </>
    )
}