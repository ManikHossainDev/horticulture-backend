
import DataShowUser from './DataShowUser';
import useUsersData from '../Hooks/useUsersData';



const UsersContainer = () => {
    const {isLoading,error,data}= useUsersData();
    const props = {
        isLoading,
        error,
        data,
    };

  return <DataShowUser {...props} />
   
};

export default UsersContainer;