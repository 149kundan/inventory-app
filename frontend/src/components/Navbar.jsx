import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        background: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", gap: 15 }}>
        <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
        <Link to="/products" style={{ color: "#fff" }}>Products</Link>
        <Link to="/movements" style={{ color: "#fff" }}>Movements</Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
