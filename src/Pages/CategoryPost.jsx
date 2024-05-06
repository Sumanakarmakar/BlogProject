import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import RecentPost from './RecentPost'
import Category from './Category'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import axios from 'axios'


const CategoryPost = () => {
    const [auth] = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [catPost, setCategoryPost] = useState([])
    const { id } = useParams()

    console.log(id);

    const token = auth?.token || JSON.parse(localStorage.getItem('auth')).token
    const getCategoryPost = async () => {
        const resp = await axios.get(`https://restapinodejs.onrender.com/api/category/post/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        setCategoryPost(resp?.data?.data)
    }

    useEffect(() => {
        getCategoryPost()
    }, [id])

    console.log(catPost)


    return (
        <>

            <Layout>
                {/* <!-- Page Header Start --> */}
                <div class="container-fluid page-header py-5">
                    <div class="container text-center py-5">
                        <h1 class="display-2 text-white mb-4 animated slideInDown">Category wise Blogs</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol class="breadcrumb justify-content-center mb-0">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/blog">Blog</Link></li>
                                <li class="breadcrumb-item" aria-current="page">CategoryPost</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!-- Page Header End --> */}

                {
                    isLoading ?
                        <>
                            
                            <h1>Loading...</h1>
                        </>
                        :
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    {catPost.length === 0 ?
                                        (<>
                                            <Card className='mx-auto mt-5' sx={{width: "400px"}}>
                                                <CardContent>
                                            <Typography className='my-auto'>There is no content about this category

                                            </Typography>
                                            </CardContent>
                                            </Card>
                                            
                                        </>)
                                        :
                                        (<>
                                            {
                                                catPost?.map((item) => {
                                                    return (
                                                        <Card sx={{ maxWidth: "100%", margin: "30px 0px 30px 100px" }} elevation={8}>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    component="img"
                                                                    height="400px"
                                                                    image={`http://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                                                                    alt="green iguana"
                                                                />
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                        <Link to={`/blogdetails/${item._id}`}>{item.title}</Link>
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        <div dangerouslySetInnerHTML={{ __html: item?.postText.slice(0, 400) }}></div>

                                                                    </Typography>
                                                                    <Typography gutterBottom variant="body2" component="div">
                                                                        ({item.likes}) likes
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    )
                                                })
                                            }
                                        </>)
                                    }


                                </Grid>
                                <Grid item xs={4}>
                                    <Category />
                                    <RecentPost />
                                </Grid>
                            </Grid>
                        </>
                }

            </Layout>

        </>
    )
}

export default CategoryPost