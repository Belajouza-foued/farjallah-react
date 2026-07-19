import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    getProduct();

  }, [id]);


  const getProduct = async () => {

    try {

      const res = await api.get(`/products/${id}`);

      setProduct(res.data.product);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Chargement...
      </h3>
    );
  }


  if (!product) {
    return (
      <h3 className="text-center mt-5">
        Produit introuvable
      </h3>
    );
  }


  return (

    <div className="product-detail container py-5">
  <div className="row g-5">

    {/* Image */}
    <div className="col-md-6">
      <div className="product-detail__img-wrap">
        <img
          src={`http://localhost:5000/uploads/${product.images?.[0]}`}
          alt={product.name}
          className="product-detail__img"
        />
      </div>
    </div>

    {/* Details */}
    <div className="col-md-6">
      <div className="product-detail__info">

        <h1 className="product-detail__name">{product.name}</h1>

        {product.sku && (
          <p className="product-detail__ref">Réf: {product.sku}</p>
        )}

        <h3 className="product-detail__price">{product.price} DT</h3>

        {/* Badge stock */}
        {product.stock > 5 ? (
          <span className="badge bg-success">En stock</span>
        ) : product.stock > 0 ? (
          <span className="badge bg-warning text-dark">
            Plus que {product.stock} en stock
          </span>
        ) : (
          <span className="badge bg-danger">Rupture de stock</span>
        )}

        <p className="product-detail__desc">{product.description}</p>

        <button
          className="product-detail__btn"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
        </button>

      </div>
    </div>

  </div>
</div>

  );

}


export default ProductDetails;