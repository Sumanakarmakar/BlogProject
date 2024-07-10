import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardActionArea, Typography, CardMedia, Button, Divider, TextField, Box, ListItemText, ListItem, List, Grid, Avatar, Skeleton } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../Context/Auth'
import { useQuery } from '@tanstack/react-query'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ButtonLoader from '../Components/ButtonLoader'
import RecentPost from './RecentPost'
import Category from './Category'


const BlogDetails = () => {
    const [auth] = useAuth()
    const [btnLoader, setBtnLoader] = useState(false)
    const [blogDetails, seBlogDetail] = useState([])
    const { id } = useParams()

    const token = auth?.token || JSON.parse(localStorage.getItem('auth')).token

    const getBlogDetails = async () => {
        const response = await axios.get(`https://student-blog.onrender.com/api/blogdetails/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        seBlogDetail(response?.data?.data)
    }

    useEffect(() => {
        getBlogDetails()
    }, [id])


    // Function to fetch the image for the blog
    const fetchImage = async () => {
        const resp = await axios.get(
            `https://student-blog.onrender.com/api/blog/image/${id}`,
            {
                headers: {
                    "x-access-token": token,
                },
                responseType: "blob",
            }
        );

        if (resp?.status === 200) {
            const imageBlobUrl = URL.createObjectURL(resp?.data);
            return imageBlobUrl;
        } else {
            throw new Error(`Unexpected response status: ${resp?.status}`);
        }
    };

    // Use react-query to fetch the image
    const {
        data: imageUrl,
        isLoading: imageLoading,
    } = useQuery({
        queryKey: ["blogImage"],
        queryFn: fetchImage,
    });

    //function for Like Comments
    const getLikeData = async () => {
        try {
            const options = {
                'method': 'PUT',
                'url': `https://student-blog.onrender.com/api/blog/like/${id}`,
                'headers': {
                  'x-access-token': token
                }
              };
              const res = await axios(options)
              console.log(res?.data);
            
        } catch (error) {
            console.log(error);
        }

    }


    //function for unlike comments
    const fetchUnlikeData = async () => {
        try{
            const options={
                'method': 'PUT',
                'url': `https://student-blog.onrender.com/api/blog/unlike/${id}`,
                'headers':{
                    'x-access-token': token
                }
            }
            const res=await axios(options)
            console.log(res?.data);
        }catch(error){
            console.log(error);
        }
        
    }

    //create comment hook form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitComment = async (data) => {
        setBtnLoader(true)
        try {
            const commentData = {
                name: data.name,
                email: data.email,
                comment: data.comment
            }
            const response = await axios.post(`https://student-blog.onrender.com/api/blog/${id}/comment/create`, commentData, {
                headers: {
                    'x-access-token': token
                }
            })
            console.log(response?.data);
            toast.success(response?.data?.message)
            setBtnLoader(false)
        } catch (error) {
            setBtnLoader(false)
            console.log(error);
            toast.error(error?.message)
        }
    }

    //show all comments
    const getAllComments = async () => {
        const res = await axios.get(`https://student-blog.onrender.com/api/comment/${id}`, {
            headers: {
                'x-access-token': token
            }
        })
        return res?.data?.post?.comment?.comments
    }

    const {
        isLoading: commentLoading,
        data: allCommentsData
    } = useQuery({
        queryKey: ['allcomments'],
        queryFn: getAllComments
    })


    console.log(token, "jj");
    console.log(id, "hh");
    return (
        <>

            <Layout>
                {/* <!-- Page Header Start --> */}
                <div class="container-fluid page-header py-5">
                    <div class="container text-center py-5">
                        <h1 class="display-2 text-white mb-4 animated slideInDown">Blog Details</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol class="breadcrumb justify-content-center mb-0">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><Link to="/blog">Blog</Link></li>
                                <li class="breadcrumb-item" aria-current="page">Details</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!-- Page Header End --> */}

                <Grid container spacing={2}>
                    <Grid item xs={8}>

                        <Card sx={{ maxWidth: "100%", margin: "40px" }} elevation={8}>
                            <CardActionArea>
                                {!blogDetails ?
                                    (
                                        <>

                                            <Skeleton variant="rectangular" width={850} height={400}
                                                sx={{ marginTop: '20px', marginLeft: "30px" }}
                                                animation="wave" />

                                            <Skeleton variant="rectangular" width={150} height={40}
                                                sx={{ marginTop: '20px', marginLeft: "30px" }}
                                                animation="wave" />

                                            <Skeleton variant="text" sx={{ fontSize: '2rem', marginTop: '20px', marginLeft: "30px", width: "850px" }} />

                                            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '20px', marginLeft: "30px", width: "850px" }} />

                                            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '20px', marginLeft: "30px", width: "850px" }} />

                                            <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: '20px', marginLeft: "30px", width: "850px", marginBottom: "20px" }} />

                                        </>
                                    )
                                    :
                                    <>
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            image={imageUrl}
                                            alt="loading images..."
                                        />
                                        <br />
                                        <Grid sx={{ marginLeft: "20px" }}>
                                            <ThumbUpOutlinedIcon color="primary" />({blogDetails?.likes})
                                            <ThumbDownOutlinedIcon color="secondary" sx={{ marginLeft: "10px" }} />
                                            ({blogDetails?.unlikes})
                                            <CommentIcon color="success" sx={{ marginLeft: "10px" }} />
                                            ({blogDetails?.comments?.length})

                                        </Grid>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {blogDetails?.title}                                              
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <div dangerouslySetInnerHTML={{ __html: blogDetails?.postText }}></div>

                                            </Typography>

                                        </CardContent>
                                    </>

                                }

                            </CardActionArea>
                        </Card>

                        <Button variant='contained' sx={{ margin: "10px 10px 10px 50px" }}
                         onClick={getLikeData}>
                            <ThumbUpOutlinedIcon />
                            {/* ({likeData?.likes}) */}
                        </Button>
                        <Button variant='contained' sx={{
                            backgroundColor: "secondary.main",
                            margin: "10px 10px 10px 0px"
                        }} onClick={fetchUnlikeData}>
                            <ThumbDownOutlinedIcon />
                            {/* ({unlikeData?.unlikes}) */}
                        </Button>

                        <Divider variant="middle" />
                        <h1 style={{ marginLeft: "40px", marginTop: "30px" }}>Write your comment</h1>
                        <Box component='form' onSubmit={handleSubmit(onSubmitComment)} noValidate sx={{ mt: 1, ml: 6, mr: 6 }}>
                            <TextField
                                id="standard-basic"
                                label="Your Name"
                                variant="standard"
                                fullWidth
                                {...register("name", {
                                    required: true
                                })}
                            >
                                Name
                            </TextField>
                            {errors?.name?.type === "required" && <p>This field is required</p>}

                            <TextField
                                id="standard-basic"
                                label="Your Email"
                                variant="standard"
                                fullWidth
                                {...register("email", {
                                    required: true
                                })}

                            >
                                Email
                            </TextField>
                            {errors?.email?.type === "required" && <p>This field is required</p>}

                            <TextField
                                id="standard-basic"
                                label="Your Comment"
                                variant="standard"
                                fullWidth
                                {...register("comment", {
                                    required: true
                                })}
                            >
                                Comment
                            </TextField>
                            {errors?.comment?.type === "required" && <p>This field is required</p>}

                            {
                                btnLoader ?
                                    <Button
                                        type="submit"

                                        variant="contained"
                                        sx={{ mt: 3, mb: 5 }}
                                    >
                                        <ButtonLoader />
                                    </Button>
                                    :
                                    <Button
                                        type="submit"

                                        variant="contained"
                                        sx={{ mt: 3, mb: 5 }}
                                    >
                                        Leave a Comment
                                    </Button>
                            }

                        </Box>
                        <Divider variant="middle" />
                        <h1 style={{ marginLeft: "40px", marginTop: "30px" }}>Comments</h1>
                        {
                            allCommentsData?.slice().reverse().map((item) => {
                                return (
                                    <>
                                        <Card sx={{ maxWidth: "1000px", ml: 4 }}>
                                            <CardActionArea>
                                                <Grid container spacing={5}>
                                                    <Grid item md={1}>
                                                        <CardMedia>
                                                            <Avatar sx={{ ml: 5, mt: 2 }}></Avatar>
                                                        </CardMedia>
                                                    </Grid>
                                                    <Grid item md={11}>
                                                        <CardContent

                                                        >
                                                            <Typography gutterBottom variant="h5" component="div"
                                                                sx={{ fontWeight: "bold" }}>
                                                                {item.name}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h6" component="div"

                                                            >
                                                                {item.comment}
                                                            </Typography>
                                                        </CardContent>
                                                    </Grid>
                                                </Grid>
                                                {/* <br />
                                        <Divider variant="middle" />
                                        <br />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                
                                            </Typography>
                                        </CardContent> */}
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

export default BlogDetails