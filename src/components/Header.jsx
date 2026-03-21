import { Link } from "react-router-dom";
import Login from "../pages/Login";

function Header() {
  return (
    <header style={styles.header}>
      <h1>RESCAR <span style={{color:"#ff6600"}}>LEDS</span></h1>

      <nav style={styles.nav}>
        <Link style={styles.link} to="/">Início</Link>
        <Link style={styles.link} to="/produtos">Produtos</Link>
        <Link style={styles.link} to="/login">Contato</Link>
      </nav>
    </header>
  );
}

const style = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 60px",
    background: "#111",
    alignItems: "center"
  },
  nav: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Header;
