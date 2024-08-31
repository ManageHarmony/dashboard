import Image from 'next/image'
import React from 'react'
import blogimg from "../../../public/assets/blogimg.png"

export default function BlogCard({ image, para, heading }: any) {
  return (
    <div className='blogCard'>
      <div className='image-container' style={{ position: 'relative', width: '100%', height: '200px', border: "0.5px solid rgba(11, 11, 11, 0.3)", borderRadius: "10px" }}>
        <Image
          src={image ? image : blogimg}
          alt="Blog Image"
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
          marginTop:10,
        }}
      >
        <h1 style={{ fontSize: 22 }}>
          {heading ? heading : 'Heading...'}
        </h1>
        <p style={{
          textAlign: 'center', marginTop:10
        }}>
          {para ? (para.length > 180 ? `${para.slice(0, 180)}...` : para) : "No content available"}
        </p>
      </div>

    </div>
  )
}
