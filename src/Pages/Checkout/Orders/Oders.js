import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        const getorders = async () => {
            const email = user?.email;
            const url = `https://morning-cliffs-42830.herokuapp.com/orders?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setOrders(data);
            } catch (error) {
                console.log(error.message);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    signOut(auth);
                    navigator('/login');
                }
            }
        }
        getorders();

    }, [user]);


    return (
        <div className='w-50 mx-auto'>
            <h2>your order : {orders.length}</h2>
            {
                orders.map(order =>
                    <div key={order._id}>
                        <p>{order.email} : {order.service}</p>
                    </div>
                )
            }

        </div>
    );
};

export default Orders;