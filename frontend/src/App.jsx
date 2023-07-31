import "./index.css";
import { Route, Routes } from "react-router-dom";
import { SingUp } from "./pages/Sing-up";
import { SingIn } from "./pages/Sing-in";

function App() {
  return (
    <Routes>
      <Route path="/sing-up" element={<SingUp />} />
      <Route path="/sing-in" element={<SingIn />} />
    </Routes>
  );
}

export default App;
