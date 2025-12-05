import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/Products/ProductList";
import ProductForm from "./pages/Products/ProductForm";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MovementList from "./pages/Movements/MovementList";
import MovementForm from "./pages/Movements/MovementForm";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with navbar wrapper */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>

      {/* Simpler way: just always show Navbar when logged in */}
      {/* Alternative: wrap content manually */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductList />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductForm />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ProductForm />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movements"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <MovementList />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movements/new"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <MovementForm />
              </>
            </ProtectedRoute>
          }
        />

        {/* default */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
