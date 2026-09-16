import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AdminStock() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getStock = useCallback(async () => {
    try {
      const res = await api.get("/admin/stock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  // Recherche par nom ou SKU
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.sku?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <h2>Gestion Stock</h2>

      {/* Barre de recherche */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom ou SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>SKU</th>
            <th>Emplacement</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.sku}</td>
              <td>{product.location}</td>

              <td>
                {product.stock === 0 ? (
                  <span className="badge bg-danger">
                    Rupture
                  </span>
                ) : product.stock < 5 ? (
                  <span className="badge bg-warning">
                    Faible ({product.stock})
                  </span>
                ) : (
                  <span className="badge bg-success">
                    {product.stock}
                  </span>
                )}
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate(`/admin/stock/${product._id}`)
                  }
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}

          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Aucun produit trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStock;

