// import React from 'react';

const DataShowUser = ({isLoading, error , data}) => {
   
    if(!isLoading && !error){
        return <p>Loading...</p>
    }
   
    if(error){
        return <p>something went wrong</p>
    }
    
    return (
        <div>
            {data.map((item) => (
            <p>{item.name}</p>
            ))}
        </div>
    );
};

export default DataShowUser;