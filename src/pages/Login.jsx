import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Login() {
  return (
    <>
      <Header />
      <div className="section container" style={{ maxWidth: "400px" }}>
        <h1 className="title">Login</h1>
        <input placeholder="Email" style={inputStyle} />
        <input placeholder="Senha" type="password" style={inputStyle} />
        <button className="btn-primary" style={{ width: "100%" }}>
          Entrar
        </button>
      </div>
      <Footer />
    </>
  )
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#111",
  color: "white"
}
