import React from 'react';
import { useForm } from "react-hook-form";


const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);


    return (
        <div className='w-50 mx-auto'>
            <h1>add service this page </h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("Name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' placeholder='Descripion' {...register("Descripion")} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' placeholder='Photo Url' type="text" {...register("img")} />
                <input className='btn btn-primary' type="submit" />
            </form>
        </div>
    );
};

export default AddService;