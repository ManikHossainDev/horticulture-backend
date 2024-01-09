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

// time set do data update done

const UseEffectExample = () => {
    const [hidden,setHidden] = useState(false);
    return (
        <div className=' flex items-center mt-11'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setHidden((prev)=> !prev)}>{hidden ? "Show" : "hide"}</button>
          {!hidden &&  <Counter />}
        </div>
    );
};
const Counter = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
       const IntervalId = setInterval(()=>{
            setCount((prev) => prev + 1 )
        }, 1000)
        return () => {
            clearInterval(IntervalId)
        }
    },[])

    return <h1 className='border border-red-500 rounded w-52 h-28 flex items-center justify-center py-1'>{count}</h1>
}


export default UseEffectExample;