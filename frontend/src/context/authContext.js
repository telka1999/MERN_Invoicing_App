import { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://mern-invoicing-app.vercel.app/api/users/profile", {
          method: "GET",
          redirect: "follow",
        });
        console.log(res);
        const data = await res.json();
        if (data?.message) {
          setUser(null);
          setLoading(false);
        } else {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchUser();
  }, [update]);

  return {
    user,
    setUpdate,
    loading,
  };
}
