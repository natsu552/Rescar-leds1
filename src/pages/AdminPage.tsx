import { useState } from "react"

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name,
      price
    }

    setProducts([...products, newProduct])
    setName("")
    setPrice("")
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="text-white p-10">
      <h1>Painel Admin</h1>

      <div>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addProduct}>Adicionar</button>
      </div>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - R$ {p.price}
            <button onClick={() => deleteProduct(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}