import { useState } from "react";

const UseStateExample = () => {
    const [counter, setCounter] = useState(0)
    return (
        <div>
            <h1>{counter}</h1>
        </div>
    );
};

export default UseStateExample;