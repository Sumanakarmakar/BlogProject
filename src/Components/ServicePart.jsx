import React from 'react'
import PageLoader from './PageLoader'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ServicePart = () => {

    const getServicesData = async () => {
        const response = await axios.get('https://studentblogapi.onrender.com/api/service')
        return response?.data?.data
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['service'],
        queryFn: getServicesData
    })
    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    console.log(data);

    return (
        <>

            <div class="container-fluid services py-5 mb-5">
                <div class="container">
                    <div class="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: "600px" }}>
                        <h5 class="text-primary">Our Services</h5>
                        <h1>Services Built Specifically For Your Business</h1>
                    </div>
                    <div class="row g-5 services-inner">
                        {
                            data?.map((item) => {
                                return (
                                    <div class="col-md-6 col-lg-4 wow fadeIn" data-wow-delay=".3s">
                                        <div class="services-item bg-light">
                                            <div class="p-4 text-center services-content">
                                                <div class="services-content-icon">
                                                    <i class="fa fa-user-secret fa-7x mb-4 text-primary"></i>
                                                    <h4 class="mb-3">{item.name}</h4>
                                                    <p class="mb-4">{item.details}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default ServicePart