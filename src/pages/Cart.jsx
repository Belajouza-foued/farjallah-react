import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../styles/cart.css'

function Cart() {

    const [cart, setCart] = useState(null);
   const navigate = useNavigate();
    const token = localStorage.getItem("token");
 const { getCart: refreshCart } = useCart();
    const getCart = useCallback(async () => {

        try {

            const res = await api.get("/cart", {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setCart(res.data.cart);

        } catch (err) {

            console.log(err);

        }

    }, [token]);

    useEffect(() => {

        getCart();

    }, [getCart]);

    const removeItem = async (productId) => {

        try {

            await api.delete("/cart/remove", {

                headers: {

                    Authorization: `Bearer ${token}`

                },

                data: {

                    productId

                }

            });

            await getCart();
await refreshCart();

        } catch (err) {

            console.log(err);

        }

    };
const updateQuantity = async (productId, newQuantity) => {
    try {

        if (newQuantity < 1) return;

        await api.put("/cart/update", 
            {
                productId,
                quantity: newQuantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

      await getCart();
await refreshCart();

    } catch (err) {
        console.log(err);
    }
};

const handleOrder = async () => {
  try {
    await api.post(
      "/orders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await getCart();
    await refreshCart();

    alert("Commande enregistrée avec succès.");

    navigate("/cart"); // ou "/success" ou "/" selon ton choix
  } catch (err) {
    console.log(err);
    alert("Erreur lors de la commande.");
  }
};
    if (!cart) {

        return <h3 className="text-center mt-5">Chargement...</h3>;

    }

  return (
  <div className="container py-5 cart-page">

    <h2 className="cart-title mb-5">Mon Panier</h2>

    <div className="row">

      <div className="col-lg-8">

        {cart.products.length === 0 ? (

          <div className="alert alert-info">
            Votre panier est vide.
          </div>

        ) : (

          cart.products.map((item) => (

            <div className="cart-card mb-4" key={item._id}>

              <div className="row align-items-center">

                <div className="col-md-3 text-center">

                  <img
                    src={`http://localhost:5000/uploads/${item.product?.images?.[0]}`}
                    alt={item.product?.name}
                    className="cart-image"
                  />

                </div>

                <div className="col-md-5">

                  <h5>{item.product?.name}</h5>

                  <p className="text-muted mb-2">
                    Prix : {item.product?.price} $
                  </p>

                  <span className="badge bg-success">
                    Disponible
                  </span>

                </div>

                <div className="col-md-2 text-center">

                  <div className="cart-qty">

                    <div className="d-flex align-items-center gap-2 justify-content-center">

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                                updateQuantity(
                                    item.product._id,
                                    item.quantity - 1
                                )
                            }
                        >
                            -
                        </button>

                        <span className="fw-bold">
                            {item.quantity}
                        </span>

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                                updateQuantity(
                                    item.product._id,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </button>

                    </div>

                  </div>

                </div>

                <div className="col-md-2 text-end">

                  <h5 className="mb-3">

                    {item.product.price * item.quantity} $

                  </h5>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      <div className="col-lg-4">

        <div className="cart-summary">

          <h4 className="mb-4">
            Résumé
          </h4>

          <div className="d-flex justify-content-between mb-3">

            <span>Sous-total</span>

            <strong>

              {cart.products.reduce(
                (total, item) =>
                  total + item.product.price * item.quantity,
                0
              )} $

            </strong>

          </div>

          <div className="d-flex justify-content-between mb-3">

            <span>Livraison</span>

            <strong>Gratuite</strong>

          </div>

          <hr />

          <div className="d-flex justify-content-between mb-4">

            <h5>Total</h5>

            <h5>

              {cart.products.reduce(
                (total, item) =>
                  total + item.product.price * item.quantity,
                0
              )} $

            </h5>

          </div>

       <button onClick={handleOrder}>
  Commander
</button>

        </div>

      </div>

    </div>

  </div>
);

}

export default Cart;