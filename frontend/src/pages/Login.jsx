import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/authApi";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await registerUser({
          name: form.name || "User",
          email: form.email,
          password: form.password
        });
        alert("Registered! Now login.");
        setIsRegister(false);
      } else {
        const { data } = await loginUser({
          email: form.email,
          password: form.password
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/products");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Name</label><br />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <button
        style={{ marginTop: 10 }}
        onClick={() => setIsRegister((prev) => !prev)}
      >
        {isRegister ? "Already have account? Login" : "New user? Register"}
      </button>
    </div>
  );
}
