import { Route, Routes, Navigate } from "react-router-dom";
import { SignUp } from "./pages/Sign-up";
import { SignIn } from "./pages/Sign-in";
import { Home } from "./pages/Home";
import { useAuth } from "./context/authContext";

function App() {
  const { user, loading } = useAuth();
  console.log(user);
  return (
    !loading && (
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
      </Routes>
    )
  );
}

export default App;
