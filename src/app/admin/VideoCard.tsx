import React from 'react';

interface VideoCardProps {
    iframe: string;
    heading?: string;
    content?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ iframe, heading, content }) => {
    return (
        <div className='videoCard' style={{ backgroundColor: "#fff", width: '560px', border: "0.5px solid rgba(11, 11, 11, 0.3)", borderRadius: "10px", marginBottom: '20px' }}>
            <div className='video-container' style={{ position: 'relative', width: '100%', height: '315px', borderRadius: "10px" }}>
                <div dangerouslySetInnerHTML={{ __html: iframe }} />
            </div>
            <div
                className="info align-self-center"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 10,
                    padding: '10px',
                }}
            >
                <h1 style={{ fontSize: 22 }}>
                    {heading ? heading : 'Heading...'}
                </h1>
                <p style={{
                    textAlign: 'center', marginTop: 10
                }}>
                    {content ? (content.length > 180 ? `${content.slice(0, 180)}...` : content) : "No content available"}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;
