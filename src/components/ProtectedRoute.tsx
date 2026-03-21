import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: any) {
  const isAuth = localStorage.getItem("adminAuth") === "true"

  if (!isAuth) return <Navigate to="/login" />

  return children
}