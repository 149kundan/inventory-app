import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    const { data } = await getProducts({ search });
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: 5 }}>Search</button>
        <Link to="/products/new" style={{ marginLeft: 10 }}>
          Add Product
        </Link>
      </form>

      <table
        border="1"
        cellPadding="5"
        style={{ marginTop: 15, width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Buying</th>
            <th>Selling</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p._id}
              style={{
                background:
                  p.currentStock < p.reorderLevel ? "#ffe5e5" : "transparent"
              }}
            >
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.category}</td>
              <td>{p.currentStock}</td>
              <td>{p.reorderLevel}</td>
              <td>{p.buyingPrice}</td>
              <td>{p.sellingPrice}</td>
              <td>
                <Link to={`/products/${p._id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
