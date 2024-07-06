import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import PageLoader from '../Components/PageLoader'
import ServicePart from '../Components/ServicePart'
import TestimonialPart from '../Components/TestimonialPart'
import TeamPart from '../Components/TeamPart'
import ContactFormPart from '../Components/ContactFormPart'
import { Link } from 'react-router-dom'


const Home = () => {

    const getBanner = async () => {
        const response = await axios.get('https://studentblogapi.onrender.com/api/banner')
        return response?.data?.bannerdata
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['banner'],
        queryFn: getBanner
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

            <Layout>

                {/* <!-- Carousel Start --> */}
                <div class="container-fluid px-0">
                    <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            {
                                data?.map((item, index) => {
                                    return (

                                        <div key={index} class={`carousel-item ${index === 0 ? 'active' : ''} `}>
                                            <img src={`https://studentblogapi.onrender.com/api/banner/photo/${item._id}`} width="100%" class="img-fluid" alt="First slide" />
                                            <div class="carousel-caption">
                                                <div class="container carousel-content">
                                                    <h6 class="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                                                    <h1 class="text-white display-1 mb-4 animated fadeInRight">{item.title}</h1>
                                                    <p class="mb-4 text-white fs-5 animated fadeInDown">{item.description}</p>
                                                    <a href="" class="me-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Read More</button></a>
                                                    <Link to="/contact" class="ms-2"><button type="button" class="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <a href='#carouselId' class="carousel-control-prev" type="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a href='#carouselId' class="carousel-control-next" type="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
                {/* <!-- Carousel End --> */}

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

                {/* <!-- About Start --> */}
                <div class="container-fluid py-5 my-5">
                    <div class="container pt-5">
                        <div class="row g-5">
                            <div class="col-lg-5 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".3s">
                                <div class="h-100 position-relative">
                                    <img src="img/about-1.jpg" class="img-fluid w-75 rounded" alt="" style={{ marginBottom: "25%" }} />
                                    <div class="position-absolute w-75" style={{ top: "25%", left: "25%" }}>
                                        <img src="img/about-2.jpg" class="img-fluid w-100 rounded" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".5s">
                                <h5 class="text-primary">About Us</h5>
                                <h1 class="mb-4">About HighTech Agency And It's Innovative IT Solutions</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur quis purus ut interdum. Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra. Suspendisse viverra hendrerit diam in tempus. Etiam gravida justo nec erat vestibulum, et malesuada augue laoreet.</p>
                                <p class="mb-4">Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra. Suspendisse viverra hendrerit diam in tempus.</p>
                                <a href="" class="btn btn-secondary rounded-pill px-5 py-3 text-white">More Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- About End --> */}

                {/* <!-- Services Start --> get this part from components folder */}
                <ServicePart />
                {/* <!-- Services End --> */}

                {/* <!-- Team Start --> */}
                <div class="container-fluid py-5 my-5 team">
                    <div class="container py-5">
                        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                            <h5 class="text-primary">Our Team</h5>
                            <h1>Meet our expert Team</h1>
                        </div>
                        
                        {/* get this part from components folder */}
                        <TeamPart />
                    </div>
                </div>
                {/* <!-- Team End --> */}

                {/* <!-- Testimonial Start --> */}
                <div class="container-fluid testimonial py-5 my-5">
                    <div class="container py-5">
                        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                            <h5 class="text-primary">Our Testimonial</h5>
                            <h1>Our Client Saying!</h1>
                        </div>
                        
                        {/* get this part from components folder */}
                        <TestimonialPart />

                    </div>
                </div>

                {/* <!-- Contact Start --> */}
                <div class="container-fluid py-5 mt-5">
                    <div class="container py-5">
                        <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{maxWidth: "600px"}}>
                            <h5 class="text-primary">Get In Touch</h5>
                            <h1 class="mb-3">Contact for any query</h1>
                            <p class="mb-2">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                        </div>
                        <div class="contact-detail position-relative p-5">
                            <div class="row g-5 mb-5 justify-content-center">
                                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
                                    <div class="d-flex bg-light p-3 rounded">
                                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{width: "64px", height: "64px"}}>
                                            <i class="fas fa-map-marker-alt text-white"></i>
                                        </div>
                                        <div class="ms-3">
                                            <h4 class="text-primary">Address</h4>
                                            <a href="https://goo.gl/maps/Zd4BCynmTb98ivUJ6" target="_blank" class="h5">23 rank Str, NY</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
                                    <div class="d-flex bg-light p-3 rounded">
                                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{width: "64px", height: "64px"}}>
                                            <i class="fa fa-phone text-white"></i>
                                        </div>
                                        <div class="ms-3">
                                            <h4 class="text-primary">Call Us</h4>
                                            <a class="h5" href="tel:+0123456789" target="_blank">+012 3456 7890</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
                                    <div class="d-flex bg-light p-3 rounded">
                                        <div class="flex-shrink-0 btn-square bg-secondary rounded-circle" style={{width: "64px", height: "64px"}}>
                                            <i class="fa fa-envelope text-white"></i>
                                        </div>
                                        <div class="ms-3">
                                            <h4 class="text-primary">Email Us</h4>
                                            <a class="h5" href="mailto:info@example.com" target="_blank">info@example.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-5">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay=".3s">
                                    <div class="p-5 h-100 rounded contact-map">
                                        <iframe class="rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4710403339755!2d-73.82241512404069!3d40.685622471397615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c26749046ee14f%3A0xea672968476d962c!2s123rd%20St%2C%20Queens%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1686493221834!5m2!1sen!2sbd" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay=".5s">
                                    <ContactFormPart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Contact End --> */}


            </Layout>

        </>
    )
}

export default Home