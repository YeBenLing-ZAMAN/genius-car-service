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
            const email = user.email;
            const url = `http://localhost:5000/orders?email=${email}`;
            try{
                const { data } = await axios.get(url, {
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setOrders(data);
            }catch(error){
                console.log(error.message);
                if(error.response?.status === 401 || error.response?.status ===403){
                    signOut(auth);
                    navigator('/login');
                }
            }
            }
        getorders();
        
    }, [user]);


    return (
        <div>
            your order : {orders.length}
        </div>
    );
};

export default Orders;