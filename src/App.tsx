
// import { useState } from "react";
import { useContext } from "react";
import "./App.css";
// import UseStateExample from "./page/UseStateExample";
// import UseStateFrom from "./page/UseStateFrom";
// import UseReducer from "./page/UseReducer";
// import UseEffectExample from "./page/UseEffect";
// import UserFormReducer from "./page/UserFormReducer";
import UseRef from "./page/UseRef";
import { contextProvider } from "./context/ThemeProvider";

function App() {
  // const [counter, setCounter] = useState(0);

  const {dark, setDark} = useContext(contextProvider)

  return (
    < >
      {/* <UseStateExample counter={counter} setCounter={setCounter} />
      <UseStateFrom />
      <UseReducer />
      <UserFormReducer />
      <UseEffectExample /> */}
      {/* <UseRef /> */}
      <div className={`h-screen w-full flex justify-center items-center ${dark ? "bg-black":"bg-white"}`}>
      <button className="bg-blue-500" onClick={() => setDark(!dark)}>Toggle</button>

      </div>
    </>
  );
}

export default App;
