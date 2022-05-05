import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        const getorders = async () => {
            const url = 'http://localhost:5000/orders';
            const { data } = await axios.get(url);
            setOrders(data);
        }
        getorders();
        
    }, []);


    return (
        <div>
            your order : {orders.length}
        </div>
    );
};

export default Orders;