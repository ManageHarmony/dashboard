
import { Spinner } from "react-bootstrap"

export default function Loading() {

    return (
        <>



            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mx-2">Loading..</h4>
            </div>

        </>
                
              
    )
}