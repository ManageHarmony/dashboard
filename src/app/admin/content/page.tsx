import ContentActionBar from "./ContentActionBar";
import ContentStats from "./ContentStats";
import 'bootstrap/dist/css/bootstrap.min.css';



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