
import { useState } from "react";
import "./App.css";
import UseStateExample from "./page/UseStateExample";
import UseStateFrom from "./page/UseStateFrom";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <UseStateExample counter={counter} setCounter={setCounter} />

      <UseStateFrom />
    </>
  );
}

export default App;
