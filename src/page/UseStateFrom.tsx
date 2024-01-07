 import React from 'react';
import { useState } from "react";
const UseStateFrom = () => {
     const [use, setUse] = useState({name:'', email:''})
     const handelForm = (e:React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(use)
     }
    return (
        <form onSubmit={handelForm}>
            <input onChange={(e)=> setUse({...use,email:e.target.value})} className="border border-red-300" type="text" name="email" id="email" />
            <input onChange={(e)=> setUse({...use, name:e.target.value})} className="border border-red-300" type="text" name="name" id="name" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">submit</button>
        </form>
    );
};

export default UseStateFrom;