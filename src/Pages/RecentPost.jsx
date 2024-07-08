import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardMedia, Divider, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

const RecentPost = () => {
    const [auth] = useAuth()
    // const [blogImg, setBlogImg] = useState({})
    const [recentPost, setRecentPost] = useState([])
    const token=auth?.token || JSON.parse(localStorage.getItem('auth')).token
    // const {id}=useParams()

    const getRecentPost = async () => {
        try {
            const response = await axios.get('https://blogapi-xe1w.onrender.com/api/letest-post', {
                headers: {
                    'x-access-token': token
                }
            })
            setRecentPost(response?.data?.data)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getRecentPost()
    }, [])

    // console.log(recentPost);

    // const { data } = useQuery({
    //     queryKey: ['recentpost'],
    //     queryFn: getRecentPost
    // })

    //for image
    // const fetchBlogImage = async (blogData) => {

    //     try {
    //         const resp = blogData._id && await axios.get(`https://restapinodejs.onrender.com/api/blog/image/${blogData._id}`, {
    //             headers: {
    //                 'x-access-token': auth?.token
    //             },
    //             responseType: 'blob'
    //         })
    //         const imageUrl = URL.createObjectURL(resp?.data)
    //         setBlogImg((images) => ({
    //             ...images,
    //             [blogData._id]: imageUrl
    //         }))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     if (data) {
    //         data?.map((blogData) => {
    //             fetchBlogImage(blogData);
    //         });
    //     }
    // }, [data]);

    console.log(recentPost);


    return (
        <>

            <Card sx={{ maxWidth: 345, marginLeft: "30px" }} className='mt-4'>
                <CardActionArea>
                    <CardContent sx={{
                        backgroundColor: "#000099", color: "white", textAlign: "center",
                    }}      >
                        <Typography gutterBottom variant="h4" component="div">
                            Recent Post
                        </Typography>

                    </CardContent>
                </CardActionArea>
                {!recentPost ?
                    (<>
                        <Skeleton variant="rounded" width={210} height={60} />
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </>) : (<>
                        <List>

                            {
                                recentPost?.map((item) => {
                                    return (
                                        <>
                                            <Card sx={{ maxWidth: "100%" }}>
                                                <CardActionArea>
                                                    <CardMedia

                                                        component="img"
                                                        height="150px"
                                                        image={`https://blogapi-xe1w.onrender.com/api/blog/image/${item._id}`}
                                                        alt="photo"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            <Link to={`/blogdetails/${item._id}`}>{item.title}</Link>
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <div dangerouslySetInnerHTML={{ __html: item?.postText.slice(0, 100) }}></div>

                                                        </Typography>

                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </>
                                    )
                                })
                            }

                        </List>
                    </>)
                }



            </Card>

        </>
    )
}

export default RecentPost