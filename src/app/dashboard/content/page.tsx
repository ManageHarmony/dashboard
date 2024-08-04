import ContentActionBar from "./ContentActionBar";
import ContentStats from "./ContentStats";
import TopArticleContent from "./TopArticleContent";


export default function Appointments () {
    return (
        <>
         <h1 className="fw-bolder fs-2 mb-3">Appointments</h1>
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