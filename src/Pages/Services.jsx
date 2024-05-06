import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout'
import ServicePart from '../Components/ServicePart'

const Services = () => {

    

    return (
        <>

            <Layout>
                {/* <!-- Page Header Start --> */}
                <div class="container-fluid page-header py-5">
                    <div class="container text-center py-5">
                        <h1 class="display-2 text-white mb-4 animated slideInDown">Services</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol class="breadcrumb justify-content-center mb-0">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item"><a href="#">Pages</a></li>
                                <li class="breadcrumb-item" aria-current="page">Services</li>
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

                {/* <!-- Service Start --> get this part from components folder */}
                <ServicePart/>


            </Layout>

        </>
    )
}

export default Services