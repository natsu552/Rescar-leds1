import { Link } from "react-router-dom";

function ProductCard({ name, price, oldPrice }) {
  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <p style={styles.old}>R$ {oldPrice}</p>
      <h2 style={{color:"#ff6600"}}>R$ {price}</h2>

      <div style={styles.buttons}>
        <a 
          href="https://wa.me/556283250793"
          target="_blank"
          style={styles.buy}
        >
          Comprar
        </a>

        <Link to="/catalogo" style={styles.details}>
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background:"#111",
    padding:"20px",
    width:"260px",
    borderRadius:"10px",
    border:"1px solid #222"
  },
  old: {
    textDecoration:"line-through",
    color:"#777"
  },
  buttons: {
    marginTop:"15px",
    display:"flex",
    gap:"10px",
    justifyContent:"center"
  },
  buy: {
    background:"#ff6600",
    padding:"8px 12px",
    color:"black",
    textDecoration:"none",
    borderRadius:"5px"
  },
  details: {
    border:"1px solid #ff6600",
    padding:"8px 12px",
    color:"#ff6600",
    textDecoration:"none",
    borderRadius:"5px"
  }
};

export default ProductCard;

