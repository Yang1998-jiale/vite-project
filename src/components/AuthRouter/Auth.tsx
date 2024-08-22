
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "@/utils/cookie/index";
const token = getItem("Authorization") || undefined;
const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<any>(token);

  const navigate = useNavigate();
  function login(data) {
    setUser(data);
    setItem("Authorization", data);
    navigate("/", { replace: true });
  }

  function register(data) {
    setUser(data);
    setItem("Authorization", data);
    navigate("/", { replace: true });
  }

  function logout() {
    setUser(null);
    setItem("Authorization", "");
    navigate("/login", { replace: true });
  }
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
