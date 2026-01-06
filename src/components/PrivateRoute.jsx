import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const admin = localStorage.getItem("admin");
  const corretor = localStorage.getItem("corretor");

  // Se NÃO estiver logado nem como admin nem como corretor → volta para login
  if (!admin && !corretor) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
