
import { useState } from "react";
import "./App.css";
import UseStateExample from "./page/UseStateExample";
import UseStateFrom from "./page/UseStateFrom";
import UseReducer from "./page/UseReducer";
import UseEffectExample from "./page/UseEffect";
import UserFormReducer from "./page/UserFormReducer";
import UseRef from "./page/UseRef";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <UseStateExample counter={counter} setCounter={setCounter} />
      <UseStateFrom />
      <UseReducer />
      <UserFormReducer />
      <UseEffectExample />
      <UseRef/>
    </>
  );
}

export default App;
