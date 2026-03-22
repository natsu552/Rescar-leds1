import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  )

  const [products, setProducts] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    model: "",
    price: "",
    sale_price: "",
    promo_active: false,
    featured: false,
    out_of_stock: false,
    image: null as string | null
  })

  // 🔐 LOGIN
  const handleLogin = (e: any) => {
    e.preventDefault()
    if (e.target.email.value === "rescar@kali" && e.target.password.value === "rescarkali") {
      localStorage.setItem("adminAuth", "true")
      setIsAuth(true)
    } else alert("Credenciais inválidas")
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuth(false)
  }

  // 📥 BUSCAR
  useEffect(() => {
    if (isAuth) fetchProducts()
  }, [isAuth])

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    setProducts(data || [])
  }

  // 📸 IMG
  const handleImage = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  // 💾 SAVE
  const save = async () => {
    const payload = {
      ...form,
      price: Number(form.price),
      sale_price: form.promo_active ? Number(form.sale_price) : null
    }

    if (editingId) {
      await supabase.from("products").update(payload).eq("id", editingId)
    } else {
      await supabase.from("products").insert([payload])
    }

    fetchProducts()
    closeModal()
  }

  const edit = (p: any) => {
    setEditingId(p.id)
    setForm({
      name: p.name || "",
      model: p.model || "",
      price: p.price || "",
      sale_price: p.sale_price || "",
      promo_active: !!p.sale_price,
      featured: !!p.featured,
      out_of_stock: !!p.out_of_stock,
      image: p.image
    })
    setShowModal(true)
  }

  const remove = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    fetchProducts()
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setForm({
      name: "",
      model: "",
      price: "",
      sale_price: "",
      promo_active: false,
      featured: false,
      out_of_stock: false,
      image: null
    })
  }

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <form onSubmit={handleLogin} className="bg-[#111] p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl mb-6 text-center text-orange-500">Admin</h2>
          <input name="email" placeholder="Email" className="w-full p-3 mb-4 bg-[#1A1A1A] rounded"/>
          <input name="password" type="password" placeholder="Senha" className="w-full p-3 mb-6 bg-[#1A1A1A] rounded"/>
          <button className="w-full bg-orange-500 p-3 rounded font-bold">Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white p-10">

      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold text-orange-500">Painel Admin</h1>
        <button onClick={logout} className="text-red-500">Sair</button>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-orange-500 px-5 py-3 rounded-lg mb-6 font-bold hover:scale-105 transition"
      >
        + Novo Produto
      </button>

      {/* 🧠 LISTA */}
      <div className="grid gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-[#111] p-4 rounded-xl flex justify-between items-center">

            <div className="flex gap-4 items-center">
              <img src={p.image} className="w-16 h-16 rounded object-cover"/>
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-gray-400">{p.model}</p>

                {p.out_of_stock && (
                  <p className="text-red-500 font-bold">ESGOTADO</p>
                )}

                {p.featured && (
                  <p className="text-orange-400">⭐ Destaque</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => edit(p)} className="text-orange-400">Editar</button>
              <button onClick={() => remove(p.id)} className="text-red-500">Excluir</button>
            </div>

          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg space-y-4 border border-orange-500">

            <h2 className="text-xl font-bold text-orange-500">
              {editingId ? "Editar Produto" : "Novo Produto"}
            </h2>

            <input placeholder="Nome" className="input" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />

            <input placeholder="Modelo" className="input" value={form.model}
              onChange={e => setForm({ ...form, model: e.target.value })} />

            <input type="number" placeholder="Preço" className="input"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })} />

            {/* TOGGLES */}
            <label className="flex justify-between">
              Promoção
              <input type="checkbox"
                checked={form.promo_active}
                onChange={e => setForm({ ...form, promo_active: e.target.checked })}
              />
            </label>

            {form.promo_active && (
              <input type="number" placeholder="Preço Promoção" className="input"
                value={form.sale_price}
                onChange={e => setForm({ ...form, sale_price: e.target.value })}
              />
            )}

            <label className="flex justify-between">
              Destaque
              <input type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
              />
            </label>

            <label className="flex justify-between">
              Esgotado
              <input type="checkbox"
                checked={form.out_of_stock}
                onChange={e => setForm({ ...form, out_of_stock: e.target.checked })}
              />
            </label>

            <input type="file" onChange={handleImage} />

            {form.image && <img src={form.image} className="w-24 rounded"/>}

            <div className="flex gap-3">
              <button onClick={save} className="bg-orange-500 w-full p-3 rounded font-bold">
                Salvar
              </button>
              <button onClick={closeModal} className="bg-gray-600 w-full p-3 rounded">
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}