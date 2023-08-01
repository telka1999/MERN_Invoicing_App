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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/profile", {
          method: "GET",
          redirect: "follow",
        });
        const data = await res.json();
        if (data?.message) {
          setUser(null);
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [update]);

  return {
    user,
    setUpdate,
  };
}
