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
        const res = await fetch(
          `${process.env.REACT_APP_URL}/api/users/profile`,
          {
            method: "GET",
            redirect: "follow",
          }
        );
        const data = await res.json();
        console.log(data);
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
