import { useState } from "react"

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [products, setProducts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleLogin = (e: any) => {
    e.preventDefault()

    if (email === "rescar@kali" && password === "rescarkali") {
      localStorage.setItem("adminAuth", "true")
      setIsAuth(true)
    } else {
      alert("Credenciais inválidas")
    }
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuth(false)
  }

  const addProduct = () => {
    if (!name || !price) return

    setProducts([...products, {
      id: Date.now(),
      name,
      price
    }])

    setName("")
    setPrice("")
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // 🔐 SE NÃO ESTIVER LOGADO → LOGIN
  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
        <form
          onSubmit={handleLogin}
          className="bg-[#111] p-8 rounded-2xl w-full max-w-md"
        >
          <h2 className="text-2xl mb-6 text-center">Admin Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-[#1A1A1A] rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 mb-6 bg-[#1A1A1A] rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-500 p-3 rounded-lg">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  // 🧠 SE ESTIVER LOGADO → PAINEL
  return (
    <div className="p-10 text-white bg-[#0A0A0A] min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl">Painel Admin</h1>
        <button onClick={logout} className="text-red-500">Sair</button>
      </div>

      {/* ADD PRODUTO */}
      <div className="bg-[#111] p-6 rounded-xl mb-8">
        <input
          placeholder="Nome"
          className="p-3 bg-[#1A1A1A] rounded-lg mr-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Preço"
          className="p-3 bg-[#1A1A1A] rounded-lg mr-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addProduct} className="bg-green-500 px-4 py-2 rounded">
          Adicionar
        </button>
      </div>

      {/* LISTA */}
      {products.map(p => (
        <div key={p.id} className="bg-[#1A1A1A] p-4 mb-2 rounded flex justify-between">
          <span>{p.name} - R$ {p.price}</span>
          <button onClick={() => removeProduct(p.id)} className="text-red-500">
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}