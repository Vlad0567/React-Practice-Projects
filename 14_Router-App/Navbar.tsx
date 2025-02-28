import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ 
      padding: "10px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
      }}>
      <Link to="/" style={{  marginRight: "20px", fontSize: "18px", textDecoration: "none", color: "#333" }}>Домой</Link>
    </nav>
  );
};

export default Navbar;
