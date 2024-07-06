import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../Context/Auth'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Button, CardActionArea, CardActions, Paper } from '@mui/material';
import PageLoader from '../Components/PageLoader'


const Courses = () => {
    const [auth] = useAuth()
    const [image, setImage] = useState({})

    const getCourses = async () => {
        const response = await axios.get('https://studentblogapi.onrender.com/api/course', {
            headers: {
                'x-access-token': auth?.token
            }
        })
        return response?.data?.Courses
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['course'],
        queryFn: getCourses
    })

    // const fetchCourseImage = async (course) => {

    //     try {
    //         const resp = course._id && await axios.get(`https://restapinodejs.onrender.com/api/course/photo/${course._id}`, {
    //             headers: {
    //                 'x-access-token': auth?.token
    //             },
    //             responseType: 'blob'
    //         })
    //         const imageUrl = URL.createObjectURL(resp?.data)
    //         setImage((images) => ({
    //             ...images,
    //             [course._id]: imageUrl
    //         }))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     if (data) {
    //         data?.map((course) => {
    //             fetchCourseImage(course);
    //         });
    //     }
    // }, [data]);

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
                {/* <!-- Page Header Start --> */}
                <div class="container-fluid page-header py-5">
                    <div class="container text-center py-5">
                        <h1 class="display-2 text-white mb-4 animated slideInDown">New Courses</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol class="breadcrumb justify-content-center mb-0">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                                <li class="breadcrumb-item" aria-current="page">Courses</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* <!-- Page Header End --> */}


                {/* <!-- Fact Start --> */}
                <div class="container-fluid bg-secondary py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 wow fadeIn" data-wow-delay=".1s">
                                <div class="d-flex counter">
                                    <h1 class="me-3 text-primary counter-value">99</h1>
                                    <h5 class="text-white mt-1">Success in getting happy customer</h5>
                                </div>
                            </div>
                            <div class="col-lg-3 wow fadeIn" data-wow-delay=".3s">
                                <div class="d-flex counter">
                                    <h1 class="me-3 text-primary counter-value">25</h1>
                                    <h5 class="text-white mt-1">Thousands of successful business</h5>
                                </div>
                            </div>
                            <div class="col-lg-3 wow fadeIn" data-wow-delay=".5s">
                                <div class="d-flex counter">
                                    <h1 class="me-3 text-primary counter-value">120</h1>
                                    <h5 class="text-white mt-1">Total clients who love HighTech</h5>
                                </div>
                            </div>
                            <div class="col-lg-3 wow fadeIn" data-wow-delay=".7s">
                                <div class="d-flex counter">
                                    <h1 class="me-3 text-primary counter-value">5</h1>
                                    <h5 class="text-white mt-1">Stars reviews given by satisfied clients</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Fact End --> */}


                {/* <!-- Project Start --> */}
                <div class="container-fluid project py-5 my-5">
                    <div class="container py-5">
                        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                            <h5 class="text-primary">Our Courses</h5>
                            <h1>Our Recently Updated Courses</h1>
                        </div>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                data?.map((item) => {
                                    return (
                                        <Grid item xs={2} sm={4} md={4}>
                                            <Card sx={{ maxWidth: 400 }} elevation={10}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="400px"
                                                        image={`https://studentblogapi.onrender.com/api/course/photo/${item._id}`}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Fee : <span>&#8377;</span>{item.fees}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Duration : {item.duration}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Requirement : {item.requirement}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button variant='contained'  >
                                                        Apply Now
                                                    </Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>
                                    )
                                })
                            }

                        </Grid>
                    </div>
                </div>
                {/* <!-- Project End --> */}
            </Layout>

        </>
    )
}

export default Courses