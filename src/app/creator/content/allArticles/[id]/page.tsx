'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';


const ArticlePost = () => {

    const { id } = useParams();
    const [article, setarticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/get/article/${id}`);
                    const { article } = await response.json();
                    console.log(article, "data")
                    setarticle(article);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching article data:', error);
                    setLoading(false);
                }
            };

            fetchBlog();
        }
    }, [id]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing.');
    }
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/user/${article.article_creatorId}/deleteArticle/${id}`, {
                method: "DELETE",headers:{'x-api-key':apiKey}

            });

            if (!response.ok) {
                throw new Error('Failed to delete the article.');
            } else {
                router.push('/creator/content/allArticles');
            }
        } catch (error) {
            console.error("Error deleting article:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
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

    if (!article) {
        return <div>article not found.</div>;
    }

    return (
        <div className='d-flex justify-between p-4'>
            <div className='each-blog'>
                <div className="imageContainer d-flex align-items-center justify-center mb-4" style={{ border: "0.5px solid rgba(0,0,0,0.4)", borderRadius: '10px' }}>
                    <Image
                        src={"/assets/blogimg.png"}
                        alt="article Image"
                        width={300}
                        height={200}
                        objectFit="cover"
                    />
                </div>
                <div style={{ fontSize: '24px' }}>{article?.heading}</div>

                <p style={{
                    textAlign: 'justify',
                    marginTop: 10,
                    lineHeight: '1.6'
                }}>{article?.content}
                </p>
            </div>
            <div className="blog-status">
                <Dropdown>
                    <Dropdown.Toggle
                        as="button"
                        className="text-orange-600 flex items-center border-1 rounded-2 bg-white px-2 py-1"
                    >
                       Action <FontAwesomeIcon icon={faEye} className="w-4 h-4 mx-1" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>

                        <Dropdown.Item className="flex items-center text-sm p-2">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#ff6600' }} />
                            Edit

                        </Dropdown.Item>
                        <Dropdown.Item
                            className="flex items-center text-sm p-2"
                            onClick={() => handleDelete(article?.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#ff6600' }} />
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default ArticlePost;
