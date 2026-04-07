import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  // 🔐 LOGIN
  const handleLogin = async (e: any) => {
    e.preventDefault()

    // ADMIN
    if (email === "rescar@kali" && password === "rescarkali") {
      localStorage.setItem("adminAuth", "true")
      navigate("/admin")
      return
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single()

    if (error || !data) {
      alert("Usuário não encontrado")
      return
    }

    localStorage.setItem("user", JSON.stringify(data))
    navigate("/")
  }

  // 🆕 CADASTRO
  const handleRegister = async (e: any) => {
    e.preventDefault()

    const { error } = await supabase.from("users").insert([
      { email, password }
    ])

    if (error) {
      alert("Erro ao cadastrar (email já existe?)")
      return
    }

    alert("Conta criada!")
    setIsLogin(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="bg-[#111] p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Criar Conta"}
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
          {isLogin ? "Entrar" : "Cadastrar"}
        </button>

        <p
          className="text-center mt-4 text-gray-400 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Criar uma conta"
            : "Já tem conta? Fazer login"}
        </p>
      </form>
    </div>
  )
}