import useServices from '../../hooks/useServices';

const ManageService = () => {

    const [services, setServices] = useServices();

    const handleDelete = id => {
        const proced = window.confirm('Are you sure? to delete');
        if (proced) {
            const url = `https://morning-cliffs-42830.herokuapp.com/service/${id}`;
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining)
                })
        }
    }
    return (
        <div>
            <h1 className='text-center my-5'>Manage service page</h1>
            {
                services.map(service =>
                    <div className='container w-100 mb-4 mx-auto border border p-4 d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <img src={service.img} className='img-fluid' style={{ height: "60px" }} alt="" />
                            <div className='ms-4 '>
                                <h5 className=' mb-0 text-center'>{service.name}</h5>
                                <p className=''>price : {service.price}</p>
                            </div>
                        </div>
                        <button className='btn btn-primary ' onClick={() => handleDelete(service._id)}>X</button>
                    </div>)
            }
        </div>
    );
};

export default ManageService;