import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ showModal, handleClose, handleLogoutConfirm, isLoading }: any) => {

    const [hoveredButton, setHoveredButton] = useState<string | null>(null);


    const buttonStyle = {
        background: "#fff",
        border: "1px dashed orange",
        color: "#ff6600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
        width: "auto"
    };

    const buttonHoverStyle = {
        background: "#ff6600",
        border: "1px solid #ff6600",
        color: "white"
    };

    const handleMouseEnter = (buttonType: string) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const getButtonStyle = (buttonType: string) => {
        if (hoveredButton === buttonType) {
            return { ...buttonStyle, ...buttonHoverStyle };
        }
        return buttonStyle;
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center">
                        <p>Please wait...</p>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <p>Are you sure you want to log out?</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!isLoading && (
                    <>
                        <Button onClick={handleClose} onMouseEnter={() => handleMouseEnter("cancel")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("cancel")}>
                            Cancel
                        </Button>
                        <Button onMouseEnter={() => handleMouseEnter("logout")}
                            onMouseLeave={handleMouseLeave}
                            style={getButtonStyle("logout")} onClick={handleLogoutConfirm}>
                            Confirm Logout
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default LogoutModal;
