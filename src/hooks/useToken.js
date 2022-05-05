import { async } from "@firebase/util";
import axios from "axios";
import { useEffect, useState } from "react"

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const getToken = async () => {
            console.log(user);
            const email = user?.user?.email;
            if (email) {
                const { data } = await axios.post('https://morning-cliffs-42830.herokuapp.com/login', { email });
                setToken(data.accesstoken);
                localStorage.setItem('accessToken', data.accesstoken);
            }
        }
        getToken();
    }, [user]);
    return [token];
}

export default useToken;