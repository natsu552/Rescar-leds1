import { useState } from "react"

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const addProduct = () => {
    if (!name || !price) return

    const newProduct = {
      id: Date.now(),
      name,
      price
    }

    setProducts([...products, newProduct])
    setName("")
    setPrice("")
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="p-10 text-white bg-[#0A0A0A] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Painel Admin</h1>

      {/* FORM */}
      <div className="bg-[#111] p-6 rounded-xl mb-8">
        <h2 className="mb-4 text-xl">Adicionar Produto</h2>

        <div className="flex gap-4">
          <input
            placeholder="Nome"
            className="p-3 bg-[#1A1A1A] rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Preço"
            className="p-3 bg-[#1A1A1A] rounded-lg w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={addProduct}
            className="bg-green-500 px-6 rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* LISTA */}
      <div className="bg-[#111] p-6 rounded-xl">
        <h2 className="mb-4 text-xl">Produtos</h2>

        {products.length === 0 && <p>Nenhum produto</p>}

        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg mb-2"
          >
            <span>{p.name} - R$ {p.price}</span>

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