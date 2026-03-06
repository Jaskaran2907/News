import { Routes, Route } from "react-router-dom";
import Title from "./component/title";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Custom from "./pages/Customised";

function App() {
  return (
    <>
      <Title />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customised" element={<Custom />} />
      </Routes>
    </>
  );
}

export default App;