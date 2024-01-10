
// import { useState } from "react";
import { useContext } from "react";
import "./App.css";

// import UseStateExample from "./page/UseStateExample";
// import UseStateFrom from "./page/UseStateFrom";
// import UseReducer from "./page/UseReducer";
// import UseEffectExample from "./page/UseEffect";
// import UserFormReducer from "./page/UserFormReducer";
// import UseRef from "./page/UseRef";
import { contextProvider, contextUseState } from "./context/ThemeProvider";
import Select from "./components/Select";
// import UsersContainer from "./components/UsersContainer";

function App() {
  // const [counter, setCounter] = useState(0);

  const {dark, setDark} = useContext(contextProvider) as contextUseState

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

      {/* <UsersContainer /> */}

      <Select>
        <Select.SelectOption value={Option1}>Option1</Select.SelectOption>
        <Select.SelectOption value={Option2}>Option2</Select.SelectOption>
        <Select.SelectOption value={Option3}>Option3</Select.SelectOption>
        <Select.SelectOption value={Option4}>Option4</Select.SelectOption>
      </Select>
    </>
  );
}

export default App;
