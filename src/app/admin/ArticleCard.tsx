import React from 'react';
import Image from 'next/image';
import blogimg from "../../../public/assets/blogimg.png";

interface ArticleCardProps {
    image?: string;
    para?: string;
    heading?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, para, heading }) => {
    const imageUrl =  image?.startsWith('http') || image?.startsWith('/') 
    ? image 
    : blogimg;

    return (
        <div className='blogCard'>
            <div 
                className='image-container' 
                style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '200px', 
                    border: "0.5px solid rgba(11, 11, 11, 0.3)", 
                    borderRadius: "10px", 
                }}
            >
                <Image
                    src={imageUrl}
                    alt="Article Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    style={{ borderRadius: "10px" }}
                />
            </div>
            <div
                className="info align-self-center"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                <h1 style={{ fontSize: 22 }}>
                    {heading || 'Heading...'}
                </h1>
                <p style={{
                    textAlign: 'center', marginTop: 10
                }}>
                    {para ? (para.length > 180 ? `${para.slice(0, 180)}...` : para) : "No content available"}
                </p>
            </div>
        </div>
    );
};

export default ArticleCard;
