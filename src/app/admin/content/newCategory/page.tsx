import React from 'react';
import { FiUser } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai'; // Importing a new icon for adding contact

const NewCategoryPage: React.FC = () => {
    return (
        <div style={styles.formContainer}>
                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Name"
                            style={styles.input}
                        />
                        <div>
                            <FiUser style={styles.icon} />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="upload"
                            placeholder="Upload Cover Photo"
                            style={styles.input}
                        />
                    </div>
                </div>
                <div style={{width: "50%",
                             height: '300px',
                             backgroundColor: "#fff",
                             padding: "10px",
                             borderRadius: "10px",
                             border: '1px solid #ddd',
                             display: "flex",
                             justifyContent: "space-between",
                             resize: 'none' as const,}}>
                    <textarea
                        placeholder="Description"
                        style={{ ...styles.input}}
                    />
                    <div className='flex-end'>
                        <FiUser style={styles.icon} />
                    </div>
                </div>
                <button style={styles.saveButton}>
                    Save <AiOutlineUserAdd style={styles.buttonIcon} />
                </button>
            </div>
    );
}

const styles = {
   
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        margin: "20px 25px",
        padding: '20px',
        width: '96%',
        // maxWidth: '1200px', // Increase the max-width for the container
        // boxSizing: 'border-box' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: "space-evenly",
        minHeight: '60vh', // Increase the height of the main div
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "40px",
        width: '50%',
        marginBottom: '20px',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '60%', // Each input group takes half of the available width in the row
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
    },
    input: {
        width: '80%', // Leave space for the icon
        padding: '10px 15px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        boxSizing: 'border-box' as const,
        outline: 'none',
        backgroundColor: 'transparent', // Ensure the input blends with the container
    },
  
  
    icon: {
        color: '#ff8a00',
        fontSize: '2rem',
        marginRight: "5px"
    },
    saveButton: {
        backgroundColor: '#ff8a00',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '1rem',
        marginTop: '20px',
        alignSelf: 'center' as const, // Center the button
        width: '150px',
    },
    buttonIcon: {
        marginLeft: '10px',
        fontSize: "2rem"
    },
};

export default NewCategoryPage;
