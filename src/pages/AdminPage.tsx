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
  const [editingId, setEditingId] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [model, setModel] = useState("")
  const [price, setPrice] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [promoActive, setPromoActive] = useState(false)
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

  // 📥 BUSCAR PRODUTOS
  useEffect(() => {
    if (isAuth) fetchProducts()
  }, [isAuth])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setProducts(data || [])
  }

  // 🖼️ IMAGEM
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // RESET
  const resetForm = () => {
    setEditingId(null)
    setName("")
    setModel("")
    setPrice("")
    setSalePrice("")
    setPromoActive(false)
    setFeatured(false)
    setImage(null)
    setShowForm(false)
  }

  // 💾 SALVAR / EDITAR
  const saveProduct = async () => {
    if (!name || !price) {
      alert("Preencha nome e preço")
      return
    }

    const payload = {
      name,
      model,
      price: Number(price),
      sale_price: promoActive ? Number(salePrice) : null,
      featured,
      image
    }

    let error

    if (editingId) {
      const res = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId)

      error = res.error
    } else {
      const res = await supabase
        .from("products")
        .insert([payload])

      error = res.error
    }

    if (error) {
      console.log(error)
      alert("Erro: " + error.message)
      return
    }

    fetchProducts()
    resetForm()
  }

  // ❌ DELETE
  const removeProduct = async (id: string) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Erro ao deletar")
      return
    }

    fetchProducts()
  }

  // ✏️ EDITAR
  const editProduct = (p: any) => {
    setEditingId(p.id)
    setName(p.name || "")
    setModel(p.model || "")
    setPrice(p.price?.toString() || "")
    setSalePrice(p.sale_price?.toString() || "")
    setPromoActive(!!p.sale_price)
    setFeatured(!!p.featured)
    setImage(p.image || null)
    setShowForm(true)
  }

  // 🔐 LOGIN UI
  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
        <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-2xl w-full max-w-md">
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
        {editingId ? "Editando..." : "Adicionar Produto"}
      </button>

      {showForm && (
        <div className="bg-[#111] p-6 rounded-xl mb-8">
          <div className="grid gap-4">

            <input
              placeholder="Nome"
              className="p-3 bg-[#1A1A1A] rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Modelo"
              className="p-3 bg-[#1A1A1A] rounded"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />

            <input
              type="number"
              placeholder="Preço Original"
              className="p-3 bg-[#1A1A1A] rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={promoActive}
                onChange={(e) => setPromoActive(e.target.checked)}
              />
              Ativar Promoção
            </label>

            {promoActive && (
              <input
                type="number"
                placeholder="Preço Promoção"
                className="p-3 bg-[#1A1A1A] rounded"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            )}

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Destaque
            </label>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {image && <img src={image} className="w-32 rounded" />}

            <div className="flex gap-2">
              <button onClick={saveProduct} className="bg-green-500 p-3 rounded w-full">
                Salvar
              </button>

              {editingId && (
                <button onClick={resetForm} className="bg-gray-500 p-3 rounded">
                  Cancelar
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      <div className="bg-[#111] p-6 rounded-xl">
        {products.map(p => (
          <div key={p.id} className="bg-[#1A1A1A] p-4 mb-3 rounded flex justify-between">

            <div className="flex gap-4">
              {p.image && <img src={p.image} className="w-16 h-16 rounded" />}

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
                  <p className="text-yellow-400">⭐ Destaque</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => editProduct(p)} className="text-blue-400">
                Editar
              </button>

              <button onClick={() => removeProduct(p.id)} className="text-red-500">
                Excluir
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}