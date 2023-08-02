import { Route, Routes, Navigate } from "react-router-dom";
import { SignUp } from "./pages/Sign-up";
import { SignIn } from "./pages/Sign-in";
import { Invoices } from "./pages/Invoices";
import { Companies } from "./pages/Companies";
import { MyAccount } from "./pages/MyAccount";
import { MainLayout } from "./layout/main";
import { useAuth } from "./context/authContext";

function App() {
  const { user, loading } = useAuth();
  return (
    !loading && (
      <MainLayout
        user={user}
        pages={
          <Routes>
            <Route
              path="/"
              element={user ? <Invoices /> : <Navigate to="/sign-in" />}
            />
            <Route
              path="/companies"
              element={user ? <Companies /> : <Navigate to="/sign-in" />}
            />
            <Route
              path="/my-account"
              element={user ? <MyAccount /> : <Navigate to="/sign-in" />}
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
        }
      />
    )
  );
}

export default App;
