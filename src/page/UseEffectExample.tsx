import  { useEffect, useState } from 'react';

// const UseEffectExample = () => {
//     const [hidden,setHidden] = useState(false);
//     useEffect(() => {
//         console.log('Render');
//         return () => {
//             console.log('Inside cleanup')
//         }
//     },[hidden])
//     return (
//         <div>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setHidden((prev)=> !prev)}>
//         submit
//       </button>
//         </div>
//     );
// };


const UseEffectExample = () => {
     const [hidden, setHidden] = useState(false);
    const [count, setCount] = useState(0)
    useEffect(() => {
        setInterval(()=>{
            console.log(count)
            setCount(count + 1)
        }, 1000)
    },[])
    return (
        <div>
            <h1>{count}</h1>
        </div>
    );
};


export default UseEffectExample;