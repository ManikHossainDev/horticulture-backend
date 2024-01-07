import React from "react";
type tCounter = {
    counter: number;
    setCounter:React.Dispatch<React.SetStateAction<number>>
}
const UseStateExample = ({counter, setCounter}:tCounter) => {
 
//   const handelDocent = () => {
//         setTimeout(()=>{
//             setCounter((prvStatus) => prvStatus -1)
//         },2000)
//   }

  return (
    <div>
      <h1>{counter}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCounter(counter + 1)}
      >
        count
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCounter(counter -1)}>
        docent
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCounter(0)}>
        rest
      </button>
    </div>
  );
};

export default UseStateExample;
