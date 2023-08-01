import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/Sign-up";
import { SignIn } from "./pages/Sign-in";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}

export default App;
