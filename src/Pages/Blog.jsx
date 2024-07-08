import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { Grid, Card, CardContent, CardActionArea, Typography, CardMedia, Skeleton } from '@mui/material'
import { useAuth } from '../Context/Auth'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Category from './Category'
import { Link } from 'react-router-dom'
import RecentPost from './RecentPost'
import PageLoader from '../Components/PageLoader'


const Blog = () => {
    const [auth] = useAuth()
    const [blogImg, setBlogImg] = useState({})
    const token= auth?.token || JSON.parse(localStorage.getItem('auth')).token

    const getAllBlogs = async () => {
        const response = await axios.get('https://blogapi-xe1w.onrender.com/api/allBlog', {
            headers: {
                'x-access-token': token
            }
        })
        return response?.data?.data
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['blog'],
        queryFn: getAllBlogs
    })

    const fetchBlogImage = async (blogData) => {

        try {
            const resp = blogData._id && await axios.get(`https://blogapi-xe1w.onrender.com/api/blog/image/${blogData._id}`, {
                headers: {
                    'x-access-token': auth?.token
                },
                responseType: 'blob'
            })
            const imageUrl = URL.createObjectURL(resp?.data)
            setBlogImg((images) => ({
                ...images,
                [blogData._id]: imageUrl
            }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (data) {
            data?.map((blogData) => {
                fetchBlogImage(blogData);
            });
        }
    }, [data]);

    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    // console.log(data);

    return (
        <>

            <Layout>
                <div class="text-center mx-auto pb-5 wow fadeIn mt-5" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                    <h5 class="text-primary">Our Blog</h5>
                    <h1>Latest Blog & News</h1>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {
                            data?.map((item) => {
                                return (
                                    <>
                                        <Card sx={{ maxWidth: "100%", margin: "30px 0px 30px 100px" }} elevation={8}>
                                            <CardActionArea>

                                                {
                                                    !item ?
                                                        <Skeleton variant="rectangular" 
                                                        width={850} height={400} />
                                                        :
                                                        <CardMedia
                                                            component="img"
                                                            height="400px"
                                                            image={blogImg[item._id]}
                                                            alt="loading images..."
                                                        />

                                                }

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        <Link to={`/blogdetails/${item._id}`}>{item.title}</Link>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <div dangerouslySetInnerHTML={{ __html: item?.postText.slice(0, 400) }}></div>

                                                    </Typography>
                                                    <Typography gutterBottom variant="body2" component="div">
                                                        ({item.comment_count}) comments
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </>
                                )
                            })
                        }

                    </Grid>
                    <Grid item xs={4}>
                        <Category />
                        <RecentPost />
                    </Grid>
                </Grid>
            </Layout>

        </>
    )
}

export default Blog