import React, { useEffect, useState } from 'react';


import StaffIcon from '@/components/icons/StaffIcon';
import { useDispatch } from 'react-redux';
import { saveArticleContent, saveBlogData, saveYTContents } from '../redux/slices/exampleSlice';


const DashboardStats = ({ isPanelHovered }: any) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState<any>({}); // Initialize count state
  useEffect(() => {
    const userId = localStorage.getItem("creator_Id");

    // Fetch data from the first API
    const fetchAllContent = async () => {
      try {
        const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${userId}/getAllContent`, {
          method: 'GET'
        });
        const data = await response.json();
        dispatch(saveArticleContent(data?.article_content || []));
        dispatch(saveYTContents(data?.yt_contents || []));


        // Extract the length of article_content and yt_contents
        const articleLength = data?.article_content?.length || 0; 
        const ytContentLength = data?.yt_contents?.length || 0;

        // Update count state with articleContentLength and ytContentLength
        setCount((prevCount:any)  => ({
          ...prevCount,  // Merge with previous state
          articleContentLength: articleLength,
          ytContentLength: ytContentLength,
        }));

      } catch (error) {
        console.error('Error fetching content data:', error);
      }
    };

    // Fetch data from the second API
    const fetchBlogs = async () => {
      try {
        // Replace with actual blog ID
        const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/get/blogs/${userId}`, {
          method: 'GET'
        });
        const {blogData}= await response.json();
        dispatch(saveBlogData(blogData || []));

        // Extract the length of blogData
        const blogLength = blogData?.length || 0;

        // Update count state with blogLength
        setCount((prevCount:any) => ({
          ...prevCount,  // Merge with previous state
          blogLength: blogLength,
        }));

      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    // Call both APIs
    fetchAllContent();
    fetchBlogs();

  }, []);

  const stats = [
    // { value: '324', label: 'Appoin. this month', icon: <StaffIcon hovered={false} selected={false} /> },
    { value: count?.articleContentLength || 0, label: 'Articles', icon: '' },
    { value: count?.ytContentLength || 0, label: 'YouTube Posts', icon: '' },
    { value: count?.blogLength || 0, label: 'Blog Posts', icon: '' },
    // { value: '383,821 Rs.', label: 'Earning this Month', icon: ""},
    // { value: '10.4 M Rs.', label: 'Total Earnings till Now', icon: '' },
  ];

  return (
    <>
      <div className="dashboard-container" style={{ display: isPanelHovered ? 'none' : 'flex', maxWidth: "100%" }}>
        <div className="stats-row">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-value" style={{ color: "#2C297E" }}>{stat?.value}</div>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
