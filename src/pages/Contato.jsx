function Contato() {
  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <h2>Fale Conosco</h2>
      <p>WhatsApp: (62) 8325-0793</p>
      <a
        href="https://wa.me/556283250793"
        target="_blank"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          background: "#ff6600",
          color: "black",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}

export default Contato;
