'use client'

import { useState } from 'react';
import { FiUser, FiFilePlus } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Spinner, ToastContainer } from 'react-bootstrap';

const NewServicePage = () => {
    const [serviceImage, setServiceImage] = useState<File | string>('');
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [subtitle, setSubtitle] = useState<string[]>([]);
    const [whatWeWillDiscuss, setWhatWeWillDiscuss] = useState<string[]>([]);
    const [benefits, setBenefits] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);

    const [duration, setDuration] = useState<number | ''>('');
    const [price, setPrice] = useState<number | ''>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setServiceImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        // Implement submit logic here
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputTags = e.target.value.split(',').map(tag => tag.trim());
        setTags(inputTags);
    };

    const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputSubtitles = e.target.value.split(',').map(subtitle => subtitle.trim());
        setSubtitle(inputSubtitles);
    };

    const handleWhatWeWillDiscussChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDiscussions = e.target.value.split(',').map(discussion => discussion.trim());
        setWhatWeWillDiscuss(inputDiscussions);
    };

    const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputBenefits = e.target.value.split(',').map(benefit => benefit.trim());
        setBenefits(inputBenefits);
    };

    const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputLanguages = e.target.value.split(',').map(language => language.trim());
        setLanguages(inputLanguages);
    };


    return (
        <>
            <div style={styles.formContainer}>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.fileInputLabel}>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            {serviceImage === '' ? 'Choose a file' : (typeof serviceImage === 'string' ? serviceImage : serviceImage.name)}
                            <FiFilePlus style={styles.icon} />
                        </label>
                    </div>
                </div>

                <div style={styles.textareaContainer}>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={styles.textarea}
                    />
                </div>


             
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Tags"
                        onChange={handleTagsChange}
                        style={styles.input}
                    />
                </div>

               
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Subtitle"
                        onChange={handleSubtitleChange}
                        style={styles.input}
                    />
                </div>

                
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="What We Will Discuss"
                        onChange={handleWhatWeWillDiscussChange}
                        style={styles.input}
                    />
                </div>

               
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Benefits"
                        onChange={handleBenefitsChange}
                        style={styles.input}
                    />
                </div>


                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Languages"
                        onChange={handleLanguagesChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="number"
                        placeholder="Duration (in minutes)"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        style={styles.input}
                    />
                </div>


                <div style={styles.inputGroup}>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        style={styles.input}
                    />
                </div>
                <button style={styles.saveButton} onClick={handleSubmit} disabled={loading}>
                    {!loading ?
                        <div style={{ display: 'flex' }}>Save <AiOutlineUserAdd style={styles.buttonIcon} /></div> :
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </button>
            </div>
            <ToastContainer />
        </>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        margin: "20px 25px",
        padding: '20px',
        width: '56%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-evenly",
        minHeight: '60vh',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: "40px",
        width: '100%',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '10px',
        marginBottom: '20px',
        padding: '0 10px',
        width: '100%',
    },
    fileInputLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',
    },
    input: {
        flex: 1,
        padding: '10px 15px',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        backgroundColor: 'transparent',
    },
    textareaContainer: {
        width: "100%",
        height: '200px',
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "10px",
        border: '1px solid #ddd',
        marginBottom: "20px"
    },
    textarea: {
        width: '100%',
        height: '100%',
        padding: '10px',
        borderRadius: '10px',
        fontSize: '1rem',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        resize: 'none',
    },
    icon: {
        color: '#ff8a00',
        fontSize: '1.5rem',
    },
    saveButton: {
        backgroundColor: '#ff8a00',
        color: '#fff',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        marginTop: '20px',
        alignSelf: 'center',
        width: '120px',
        height: '50px',
    },
    buttonIcon: {
        marginLeft: '10px',
        fontSize: "1.5rem",
    },
};

export default NewServicePage;
