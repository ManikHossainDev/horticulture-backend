
import { useState } from "react";
import "./App.css";
import UseStateExample from "./page/UseStateExample";
import UseStateFrom from "./page/UseStateFrom";
import UseReducer from "./page/UseReducer";
import UserFormReducer from "./page/userFormReducer";
import UseEffectExample from "./page/UseEffectExample";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <UseStateExample counter={counter} setCounter={setCounter} />
      <UseStateFrom />
      <UseReducer />
      <UserFormReducer />

      <UseEffectExample />
    </>
  );
}

export default App;
