import  { useEffect, useState } from 'react';
import DataShowUser from './DataShowUser';



const UsersContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const url = 'https://jsonplaceholder.typicode.com/users';

    const getUsers = async () => {
        setIsLoading(true)
        try{
             const res = await fetch(url);
             const data = await res.json();
             setData(data)
        }catch(err){
            setError(true)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const props = {
        isLoading,
        error,
        data,
    };

  return <DataShowUser {...props} />
   
};

export default UsersContainer;