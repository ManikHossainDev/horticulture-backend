import { useEffect, useRef,  } from "react";
import CustomInput from "./CustomInput";
// useState import kor te comment ar code run kor jon
// const UseRef = () => {
//     const [count, setCount] = useState(0);
//     const myRef = useRef(0)
//     const increment = () => {
//         myRef.current = myRef.current + 1;
//         setCount(count + 1)
//         console.log('ref =>', myRef.current)
//     }
//     return (
//         <div>
//             <h1>useRef</h1>
//             <button onClick={() => increment()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         {myRef.current}
//       </button>
//         </div>
//     );

// };

const UseRef = () => {
  const myRef = useRef<HTMLInputElement | null>(null);
  useEffect( () => {
    myRef.current?.focus();
  },[]);

  return (
    <div>
      <h1>useRef</h1>
      <form>
        <CustomInput ref={myRef}  className="border text-red-600 border-yellow-200 rounded" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UseRef;
