// BlogCarousel.tsx

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import BlogCard from './BlogCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/textUtils';

interface topBlogs {
    id: number;
    heading: string;
    data: any;
    headings: any
}

// Custom left arrow component
const PrevArrow = ({ onClick }: any) => (
    <div
        className="slick-arrow slick-prev"
        style={{
            left: '-25px', zIndex: 1, backgroundColor: "#FFA05D", color: "#fff",
            borderRadius: '50%'
        }}
        onClick={onClick}
    >
    </div>
);

const NextArrow = ({ onClick }: any) => (
    <div
        className="slick-arrow slick-next"
        style={{
            right: '-5px', zIndex: 1, backgroundColor: "#FFA05D", color: "#fff",
            borderRadius: '50%'
        }}
        onClick={onClick}
    >
    </div>
);

export default function BlogCarousel() {
    const [topBlogs, setTopBlogs] = useState<topBlogs[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://harmony-backend-z69j.onrender.com/api/admin/get/top/blogs", {
                    method: "GET", headers: { 'x-api-key': apiKey }
                })
                if (!response.ok) {
                    throw new Error("Failed to fetching data")
                }

                const data = await response.json();
                console.log("data", data);
                setTopBlogs(data?.blogs);
                setLoading(false)
            } catch (error) {
                console.error("something went wrong", error)
                setLoading(false)
            }
        }
        fetchData();
    }, []);

    const handleClick = (id: number) => {
        router.push(`/admin/content/allblogs/${id}`)
    }


    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,  // Custom left arrow
        nextArrow: <NextArrow />,  // Custom right arrow
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div style={{ marginTop: '40px', width: "90%", marginLeft: 'auto', marginRight: 'auto' }}>
            <h3 style={{ marginBottom: "20px" }}>Recent Blog Posts</h3>
            {!loading ? (topBlogs.length > 0 ? (<Slider {...settings}>
                {topBlogs.map((blog, index) => (
                    <div key={index} className="carousel-slide">
                        <BlogCard
                            image={blog.data.images[0] ? blog.data.images[0] : "/public/assests/avatar.jpg"}
                            heading={truncateText(
                                blog?.data?.headings?.h1?.[0] ||
                                blog?.data?.headings?.h2?.[0] ||
                                'No headings available',
                                15
                            )}
                            para={truncateText(blog?.data?.paragraphs?.join(' '), 100)}
                        />
                    </div>
                ))}
            </Slider>) : (<div className="text-center mt-5">
                <p className="text-gray-600">No Blog found</p>
            </div>)) : (<div className="text-center mt-5">
                <p className="text-gray-600">Loading Blogs...</p>
            </div>)}
        </div>
    );
}
