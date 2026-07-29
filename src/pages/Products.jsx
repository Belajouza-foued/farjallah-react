import React, { useEffect, useState,useCallback } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import Sidebar from "../components/Sidebar";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || null;

  const [searchInput, setSearchInput] = useState(search);

  const { getCart } = useCart();

  // =========================
  // GET PRODUCTS
  // =========================
const getProducts = useCallback(async () => {

  try {

    setLoading(true);

    const res = await api.get(
      `/products?search=${search}${
        activeCategory ? `&category=${activeCategory}` : ""
      }`
    );

    setProducts(res.data.products);


  } catch (err) {

    console.log(err);


  } finally {

    setLoading(false);

  }

}, [search, activeCategory]);

useEffect(() => {

  getProducts();

}, [getProducts]);

  // =========================
  // SEARCH SUBMIT
  // =========================
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (searchInput) params.search = searchInput;
    if (activeCategory) params.category = activeCategory;
    setSearchParams(params);
  };

  // =========================
  // CATEGORY SELECT
  // =========================
  const handleSelectCategory = (cat) => {
    const params = {};
    if (search) params.search = search;
    if (cat) params.category = cat;
    setSearchParams(params);
    setSidebarOpen(false);
  };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Connectez-vous pour ajouter au panier");
        return;
      }

      const res = await api.post(
        "/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);

      await getCart();
      alert("Produit ajouté au panier");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
  <div className="products-page">
  <h1 className="products-page__title">Liste des Produits</h1>

  {/* SEARCH */}
  <form className="products-search" onSubmit={handleSearchSubmit}>
    <input
      type="text"
      className="products-search__input"
      placeholder="Rechercher un produit..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
    <button type="submit" className="products-search__btn">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>

  {/* Bouton filtres — visible surtout sur mobile */}
  <button
    className="products-filter-toggle"
    onClick={() => setSidebarOpen(true)}
  >
    <i className="fa-solid fa-sliders"></i> Filtres
  </button>

  <div className="products-layout">
    <Sidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      activeCategory={activeCategory}
      onSelectCategory={handleSelectCategory}
    />

    {/* CONTENT */}
    {loading ? (
      <p className="products-page__state">Chargement...</p>
    ) : products.length === 0 ? (
      <p className="products-page__state">Aucun produit trouvé.</p>
    ) : (
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-tile">
            <div className="product-tile__img-wrap">
              <img
                src={`http://localhost:5000/uploads/${product.images?.[0]}`}
                alt={product.name}
                className="product-tile__img"
              />
            </div>

            <div className="product-tile__body">
              <h3 className="product-tile__name">{product.name}</h3>

              <p className="product-tile__desc">{product.description}</p>
                <p className="product-tile__desc">{product.location}</p>

              <h4 className="product-tile__ref">REF: {product.sku}</h4>

              {product.stock > 5 ? (
                <span className="badge bg-success">En stock</span>
              ) : product.stock > 0 ? (
                <span className="badge bg-warning text-dark">
                  Plus que {product.stock}
                </span>
              ) : (
                <span className="badge bg-danger">Rupture de stock</span>
              )}

              <button
                className="product-tile__btn"
                disabled={product.stock === 0}
                onClick={() => addToCart(product._id)}
              >
                {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  <CategorySection/>
</div>
  );
};

export default Products;