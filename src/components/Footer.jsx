function Footer() {
  return (
    <footer style={styles.footer}>
      <h3>Precisa de ajuda?</h3>

      <a 
        href="https://wa.me/556283250793"
        target="_blank"
        style={styles.button}
      >
        Falar Conosco no WhatsApp
      </a>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign:"center",
    padding:"60px",
    background:"#111",
    marginTop:"60px"
  },
  button: {
    display:"inline-block",
    marginTop:"20px",
    padding:"12px 20px",
    background:"#ff6600",
    color:"black",
    textDecoration:"none",
    borderRadius:"6px",
    fontWeight:"bold"
  }
};

export default Footer;
