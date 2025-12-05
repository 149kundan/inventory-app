import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProduct, updateProduct } from "../../api/productApi";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    buyingPrice: 0,
    sellingPrice: 0,
    currentStock: 0,
    reorderLevel: 5
  });

  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEdit) return;
      const { data } = await getProduct(params.id);
      setForm(data);
    };
    fetchProduct();
  }, [isEdit, params.id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (["buyingPrice", "sellingPrice", "currentStock", "reorderLevel"].includes(name)) {
      value = Number(value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(params.id, form);
      } else {
        await createProduct(form);
      }
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>SKU</label><br />
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label><br />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Description</label><br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Buying Price</label><br />
          <input
            type="number"
            name="buyingPrice"
            value={form.buyingPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Selling Price</label><br />
          <input
            type="number"
            name="sellingPrice"
            value={form.sellingPrice}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Current Stock</label><br />
          <input
            type="number"
            name="currentStock"
            value={form.currentStock}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Reorder Level</label><br />
          <input
            type="number"
            name="reorderLevel"
            value={form.reorderLevel}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          Save
        </button>
      </form>
    </div>
  );
}
