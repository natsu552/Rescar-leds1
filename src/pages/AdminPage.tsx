import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  )

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [products, setProducts] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [featured, setFeatured] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  // 🔐 LOGIN
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

  // 📥 CARREGAR PRODUTOS
  useEffect(() => {
    if (isAuth) fetchProducts()
  }, [isAuth])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setProducts(data)
  }

  // 🖼️ UPLOAD
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // ➕ ADD PRODUTO
  const addProduct = async () => {
    if (!name || !price) {
      alert("Preencha nome e preço")
      return
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        model,
        price,
        sale_price: salePrice,
        featured,
        image
      }
    ])

    if (error) {
      alert("Erro ao salvar")
      return
    }

    fetchProducts()

    // limpar
    setName("")
    setModel("")
    setPrice("")
    setSalePrice("")
    setFeatured(false)
    setImage(null)
    setShowForm(false)
  }

  // ❌ DELETE
  const removeProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  // 🔐 LOGIN UI
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

  // 🧠 ADMIN UI
  return (
    <div className="p-10 text-white bg-[#0A0A0A] min-h-screen">

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Painel Admin</h1>
        <button onClick={logout} className="text-red-500">Sair</button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-500 px-4 py-2 rounded mb-6"
      >
        Adicionar Produto
      </button>

      {showForm && (
        <div className="bg-[#111] p-6 rounded-xl mb-8">
          <h2 className="text-xl mb-4">Novo Produto</h2>

          <div className="grid gap-4">

            <input
              placeholder="Nome"
              className="p-3 bg-[#1A1A1A] rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Modelo"
              className="p-3 bg-[#1A1A1A] rounded-lg"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />

            <input
              placeholder="Preço Original"
              className="p-3 bg-[#1A1A1A] rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Preço Promoção"
              className="p-3 bg-[#1A1A1A] rounded-lg"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Destaque
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {image && (
              <img src={image} className="w-32 h-32 rounded" />
            )}

            <button
              onClick={addProduct}
              className="bg-green-500 p-3 rounded-lg"
            >
              Salvar Produto
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#111] p-6 rounded-xl">
        <h2 className="mb-4 text-xl">Produtos</h2>

        {products.map(p => (
          <div
            key={p.id}
            className="bg-[#1A1A1A] p-4 mb-3 rounded-lg flex justify-between"
          >
            <div className="flex gap-4">

              {p.image && (
                <img src={p.image} className="w-16 h-16 rounded" />
              )}

              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-gray-400">{p.model}</p>

                <p className="line-through text-gray-500">
                  R$ {p.price}
                </p>

                {p.sale_price && (
                  <p className="text-green-400 font-bold">
                    R$ {p.sale_price}
                  </p>
                )}

                {p.featured && (
                  <span className="text-yellow-400">
                    ⭐ Destaque
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => removeProduct(p.id)}
              className="text-red-500"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}