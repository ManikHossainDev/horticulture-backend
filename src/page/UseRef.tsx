import { useRef,  } from "react";
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
  const myRef = useRef(null);

  return (
    <div>
      <h1>useRef</h1>
      <form>
        <input ref={myRef}
          className="border border-red-300 rounded"
          type="text"
          name="name"
          id="name"
          value=""
        />
      </form>
    </div>
  );
};

export default UseRef;
