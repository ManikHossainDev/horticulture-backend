 import React from 'react';
import { useState } from "react";
const UseStateFrom = () => {
     const [use, setUse] = useState({name:'', email:''})
     const handelFormSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(use)
     }
    const handelInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name;
        const value = e.target.value;
        setUse({...use, [inputName]:value});
    }

    return (
        <form onSubmit={handelFormSubmit}>
            <input onChange={handelInputChange} className="border border-red-300" type="text" name="email" id="email" />
            <input onChange={handelInputChange} className="border border-red-300" type="text" name="name" id="name" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">submit</button>
        </form>
    );
};

export default UseStateFrom;