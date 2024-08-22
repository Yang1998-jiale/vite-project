import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./Auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const routerWhite = ["/login", "/404", "/register"];
  const { user }: any = useAuth();
  console.log(user);

  if (!user) {
    return (
      <Navigate
        to={
          routerWhite.includes(location.pathname) ? location.pathname : "/login"
        }
      />
    );
  }

  return children;
}
