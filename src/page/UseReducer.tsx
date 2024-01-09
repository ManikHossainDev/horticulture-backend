// import React from 'react';

import { useReducer } from "react";
const initialState = {count:0}
type Taction = {
    type :string;
}
const reducer = (currentState : typeof initialState, action:Taction) => {
 switch(action.type){
    case 'increment':
        return{count: currentState.count + 1 };
    case 'decrement':
        return{ count: currentState.count - 1 };
    default :
        return currentState ;
 }
}

const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={() => dispatch({type:'increment'})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">increment</button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">rest</button>
            <button onClick={() => dispatch({type:'decrement'})}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">decrement</button>
        </div>
    );
};

export default UseReducer;