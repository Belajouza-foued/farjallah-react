import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/ProductDetails.css"

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);

        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);
const addToCart = async () => {

  try {

    if (!token) {
      alert("Veuillez vous connecter pour ajouter au panier");
      return;
    }


    await api.post(
      "/cart/add",
      {
        productId: product._id,
        quantity: 1
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    alert("Produit ajouté au panier");


  } catch(err){

    console.log(err);

    alert("Erreur ajout panier");

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
console.log("PRODUCT :", product);
console.log("VEHICLES :", product?.compatibleVehicles);
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

        {/* Détails */}
        <div className="col-md-6">
          <div className="product-detail__info">

            <h1 className="product-detail__name">{product.name}</h1>

            {product.sku && (
              <p className="product-detail__ref">
                Réf : {product.sku}
              </p>
            )}

            <h3 className="product-detail__price">
              {product.price} DT
            </h3>

            {product.stock > 5 ? (
              <span className="badge bg-success">
                En stock
              </span>
            ) : product.stock > 0 ? (
              <span className="badge bg-warning text-dark">
                Plus que {product.stock} en stock
              </span>
            ) : (
              <span className="badge bg-danger">
                Rupture de stock
              </span>
            )}

            <p className="product-detail__desc">
              {product.description}
            </p>

         <button
  className="product-detail__btn"
  disabled={product.stock === 0}
  onClick={addToCart}
>
  {product.stock === 0
    ? "Indisponible"
    : "Ajouter au panier"}
</button>
<div className="compatible-box">

    <h4>
        🚗 Véhicules compatibles
    </h4>


    {
        product?.compatibleVehicles?.map((vehicle)=>(

            <div 
            key={vehicle._id}
            className="vehicle-item"
            >

                🚗 {vehicle.brand} {vehicle.model}
                {" "}({vehicle.year})
                {" - "}
                {vehicle.engine}

            </div>

        ))
    }


</div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;