import { useState, useContext, createContext } from "react";

const toastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = useProvideToast();
  return (
    <toastContext.Provider value={toast}>{children}</toastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(toastContext);
};

function useProvideToast() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  return {
    message,
    setMessage,
    open,
    setOpen,
  };
}
