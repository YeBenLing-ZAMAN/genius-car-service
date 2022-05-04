import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServiceDetails from '../../hooks/useServiceDetails';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetails(serviceId);
    return (
        <div className='d-flex flex-column flex-md-row w-100 w-md-75 m-auto p-3'>
            <div className='p-3 w-100 w-md-25 d-flex content-center justify-content-md-end'>
                <img src={service.img} alt="" />
            </div>
            <div className='p-3 w-100 d-flex justify-content-md-start'>
                <div>
                    <h2>Welcome to Detail: <small className='text-primary'> {service.name}</small></h2>
                    <h3>Price: <small className='text-primary'> {service.price}</small></h3>
                    <p>{service.description}</p>
                    <div className=''>
                        <Link to={`/checkout/${serviceId}`}>
                            <button className='btn btn-primary'>Proceed Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;