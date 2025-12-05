import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getDashboardSummary();
        setData(data);
      } catch (err) {
        alert(err.response?.data?.message || "Error loading dashboard");
      }
    };
    load();
  }, []);

  if (!data) return <div style={{ padding: 20 }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Total Stock Value</h3>
          <p>₹ {data.totalStockValue}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Low Stock Products</h3>
          <p>{data.lowStockProducts.length}</p>
        </div>
      </div>

      <h3>Low Stock Details</h3>
      <table border="1" cellPadding="5" style={{ marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {data.lowStockProducts.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.currentStock}</td>
              <td>{p.reorderLevel}</td>
            </tr>
          ))}
          {data.lowStockProducts.length === 0 && (
            <tr>
              <td colSpan="4">No low stock products 🎉</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Recent Movements</h3>
      <table border="1" cellPadding="5" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Type</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.recentMovements.map((m) => (
            <tr key={m._id}>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
              <td>{m.product?.name}</td>
              <td>{m.type}</td>
              <td>{m.quantity}</td>
            </tr>
          ))}
          {data.recentMovements.length === 0 && (
            <tr>
              <td colSpan="4">No movements yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

