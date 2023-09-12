import "./Footer.css";

function Footer() {
  const year = new Date("2023-09-12").getFullYear();
  return (
    <footer className="footer">
      <p>Developed by Matthew Sanchez</p>

      <p>{year}</p>
    </footer>
  );
}

export default Footer;
