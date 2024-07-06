import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Slider from "react-slick";
import Divider from '@mui/material/Divider';
import PageLoader from './PageLoader';
import '../Components.css'

const TestimonialPart = () => {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                slidesToShow: 1
              }
            }
          ]
        
    };

    const getTestimonialData = async () => {
        const response = await axios.get('https://studentblogapi.onrender.com/api/testimonial')
        return response?.data?.testimonials
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['testimonial'],
        queryFn: getTestimonialData
    })
    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    // console.log(data);

    return (
        <>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        data?.map((item, index) => {
                            return (
                                <Card sx={{ maxWidth: '100%', height: "500px" }} className='card_area_custom'>
                                    <CardActionArea>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} md={4} className='testimonial_client'>
                                                <CardMedia
                                                    component="img"
                                                    height="200px"

                                                    image={`https://studentblogapi.onrender.com/api/testimonials/photo/${item._id}`}
                                                    alt="green iguana"
                                                    sx={{ margin: "10px 20px", width: "130px" }}
                                                    
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <CardContent
                                                    sx={{ margin: "30px 20px" }}
                                                    className='card_content_custom'
                                                >
                                                    <Typography gutterBottom variant="h5" component="div"
                                                        sx={{ fontWeight: "bold" }}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" component="div"
                                                        sx={{ color: "#8000FF" }}
                                                    >
                                                        {item.position}
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.talk}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }

                </Slider>
            </div>

        </>
    )
}

export default TestimonialPart