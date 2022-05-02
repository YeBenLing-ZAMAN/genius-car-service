import React from 'react';
import { useForm } from "react-hook-form";


const AddService = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        const url = `http://localhost:5000/addservice`;
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                if(result.acknowledged===true){
                    alert('your service is successfully added');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }


    return (
        <div className='w-50 mx-auto'>
            <h1>add service this page </h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' placeholder='Descripion' {...register("description")} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' placeholder='Photo Url' type="text" {...register("img")} />
                <input className='btn btn-primary' type="submit" value='Add Service ' />
            </form>
        </div>
    );
};

export default AddService;