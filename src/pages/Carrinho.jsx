import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Carrinho() {
  return (
    <>
      <Header />
      <div className="section container">
        <h1 className="title">Seu Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
      </div>
      <Footer />
    </>
  )
}
