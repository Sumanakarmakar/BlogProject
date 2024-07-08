import React from 'react'
import Slider from "react-slick";
import { Card } from '@mui/material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const TeamPart = () => {
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

    const getTeamMember = async () => {
        const response = await axios.get('https://blogapi-xe1w.onrender.com/api/team')
        return response?.data?.TeamMember
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['team'],
        queryFn: getTeamMember
    })
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    console.log(data);

    return (
        <>

            <div className="slider-container">
                <Slider {...settings}>
                    {
                        data?.map((item) => {
                            return (
                                <Card sx={{ maxWidth: 420 }}>
                                    <div class="rounded team-item ml-5">
                                        <div class="team-content">
                                            <div class="team-img-icon">
                                                <div class="team-img rounded-circle">
                                                    <img src={`https://blogapi-xe1w.onrender.com/api/team/photo/${item._id}`} class="img-fluid w-100 rounded-circle" alt="" />
                                                </div>
                                                <div class="team-name text-center py-3">
                                                    <h4 class="">{item.name}</h4>
                                                    <p class="m-0">{item.possession}</p>
                                                </div>
                                                <div class="team-icon d-flex justify-content-center pb-4">
                                                    <a class="btn btn-square btn-secondary text-white rounded-circle m-1" href=""><i class="fab fa-facebook-f"></i></a>
                                                    <a class="btn btn-square btn-secondary text-white rounded-circle m-1" href=""><i class="fab fa-twitter"></i></a>
                                                    <a class="btn btn-square btn-secondary text-white rounded-circle m-1" href=""><i class="fab fa-instagram"></i></a>
                                                    <a class="btn btn-square btn-secondary text-white rounded-circle m-1" href=""><i class="fab fa-linkedin-in"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }

                </Slider>
            </div>

        </>
    )
}

export default TeamPart