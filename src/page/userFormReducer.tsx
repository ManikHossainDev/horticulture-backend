/* eslint-disable react-hooks/rules-of-hooks */
import React, { useReducer } from "react";

const initialState = {name:'', email:''}

type Taction = {
    type:string;
    payload:string;
}

const reducer = (currentState : typeof initialState, action:Taction) => {
 switch(action.type){
    case 'addName':
        return{...currentState, name: action.payload };
    case 'addEmail':
        return{...currentState, email: action.payload };
    default :
        return currentState ;
 }
}


const UserFormReducer = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(state)
    }
        
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => dispatch({type:'addEmail', payload:e.target.value})} className="border border-red-300" type="text" name="email" id="email" />
            <input onChange={(e) => dispatch({type:'addName', payload:e.target.value})} className="border border-red-300" type="text" name="name" id="name" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">submit</button>
        </form>
    );
};

export default UserFormReducer;