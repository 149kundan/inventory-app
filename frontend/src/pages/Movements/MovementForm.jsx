import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import { createMovement } from "../../api/movementApi";

export default function MovementForm() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: 0,
    note: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
        if (data.length > 0) {
          setForm((prev) => ({ ...prev, productId: data[0]._id }));
        }
      } catch (err) {
        alert(err.response?.data?.message || "Error loading products");
      }
    };
    loadProducts();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "quantity") value = Number(value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovement(form);
      alert("Movement recorded");
      navigate("/movements");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving movement");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Stock Movement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product</label><br />
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            required
          >
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.sku})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label><br />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="IN">IN (Add stock)</option>
            <option value="OUT">OUT (Remove stock)</option>
          </select>
        </div>

        <div>
          <label>Quantity</label><br />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Note</label><br />
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="e.g. Purchased, Sold to customer..."
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          Save Movement
        </button>
      </form>
    </div>
  );
}
