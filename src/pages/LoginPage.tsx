import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e: any) => {
    e.preventDefault()

    if (email === "rescar@kali" && password === "rescarkali") {
      localStorage.setItem("adminAuth", "true")
      navigate("/admin")
    } else {
      alert("Credenciais inválidas")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#111] p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Acesso Administrativo
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-[#1A1A1A] rounded-lg outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 mb-6 bg-[#1A1A1A] rounded-lg outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold">
          Entrar
        </button>
      </form>
    </div>
  )
}