import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  const produtos = [
    { id:1, name:"LED Multicolor", price:"149,90", oldPrice:"199,90" },
    { id:2, name:"LED RV16", price:"129,90", oldPrice:"179,90" },
    { id:3, name:"LED R16", price:"189,90", oldPrice:"249,90" }
  ];

  return (
    <>
      <section style={styles.section}>
        <h2>PRODUTOS EM DESTAQUE</h2>

        <div style={styles.grid}>
          {produtos.map(produto => (
            <ProductCard key={produto.id} {...produto} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

const styles = {
  section: {
    padding: "60px",
    textAlign: "center"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  }
};

export default Home;
<a
  href="https://wa.me/556283250793"
  target="_blank"
  style={{
    display: "inline-block",
    marginTop: "40px",
    padding: "12px 20px",
    background: "#ff6600",
    color: "black",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  }}
>
  Falar Conosco no WhatsApp
</a>
