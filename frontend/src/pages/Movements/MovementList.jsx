import { useEffect, useState } from "react";
import { getMovements } from "../../api/movementApi";
import { Link } from "react-router-dom";

export default function MovementList() {
  const [movements, setMovements] = useState([]);

  const loadMovements = async () => {
    try {
      const { data } = await getMovements();
      setMovements(data);
    } catch (err) {
      alert(err.response?.data?.message || "Error loading movements");
    }
  };

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Stock Movements</h2>
      <Link to="/movements/new">Add Movement (IN / OUT)</Link>

      <table
        border="1"
        cellPadding="5"
        style={{ marginTop: 15, width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m._id}>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
              <td>{m.product?.name}</td>
              <td>{m.product?.sku}</td>
              <td>{m.type}</td>
              <td>{m.quantity}</td>
              <td>{m.note}</td>
            </tr>
          ))}
          {movements.length === 0 && (
            <tr>
              <td colSpan="6">No movements yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
