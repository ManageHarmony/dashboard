
import { Spinner } from "react-bootstrap"

export default function Loading() {

    return (
        <>



            <div className="d-flex justify-content-center align-items-center vh-100 mx-2">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4>Loading..</h4>
            </div>

        </>
                
              
    )
}