import { useParams } from "react-router-dom";
import { useEffect, useState,useCallback } from "react";
import api from "../api/axios";
import '../styles/CategoryProducts.css'
import { Link } from "react-router-dom";

function CategoryProducts() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);



const loadProducts = useCallback(async () => {
  try {

    const res = await api.get(`/products?category=${slug}`);

    setProducts(res.data.products);

  } catch (err) {

    console.log(err);

  }

}, [slug]);
useEffect(() => {

  loadProducts();

}, [loadProducts]);

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">
          {slug.replace("-", " ")}
        </h2>

        <p className="text-muted">
          {products.length} Produit(s) disponible(s)
        </p>
      </div>

      <div className="row g-4">

        {products.length === 0 ? (

          <div className="text-center">
            <h4>Aucun produit trouvé.</h4>
          </div>

        ) : (

          products.map((product) => (

          <div
  className="col-lg-3 col-md-4 col-sm-6 mb-4"
  key={product._id}
>
  <div className="card border-0 shadow-sm h-100 product-card">
    <div className="product-card__img-wrap">
      <img
        src={`http://localhost:5000/uploads/${product.images?.[0]}`}
        className="product-card__img"
        alt={product.name}
      />

      {product.stock === 0 && (
        <span className="product-card__badge">Rupture</span>
      )}
    </div>

    <div className="card-body d-flex flex-column">
      <h5 className="product-card__name">{product.name}</h5>

      <p className="product-card__ref">Réf: {product.sku}</p>

      <Link
  to={`/products/${product._id}`}
  className="product-card__btn mt-auto"
>
  Voir le produit
</Link>
    </div>
  </div>
</div>

          ))

        )}

      </div>

    </div>
  );
}

export default CategoryProducts;