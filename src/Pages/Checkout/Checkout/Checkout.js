import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetails(serviceId);
    const [user] = useAuthState(auth);


    /* how to handle input field */
    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }

        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const {statusText} = response;
                if(statusText === 'OK'){
                    toast("your order is sucessfully booked !")
                    event.target.reset();
                }
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2> <small>Please Checkout your booking : </small> <br /> <strong className='text-primary'>{service?.name}</strong> </h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" name='name' placeholder='Name' value={user?.displayName} readOnly /> <br />
                <input className='w-100 mb-2' type="email" name='email' placeholder='Email' value={user?.email} readOnly required disabled /> <br />
                <input className='w-100 mb-2' type="text" name='service' placeholder='Service' value={service.name} readOnly /> <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Address' required /> <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='Phone' required /> <br />
                <div className='w-100'>
                    <input className='w-50 mx-auto btn btn-primary' type="submit" value='Confirm Order' />
                </div>
            </form>
        </div>
    );
};

export default Checkout;