import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();

    const clientSecret = location.state?.clientSecret;

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement
                }
            }
        );

        if (error) {
            alert(error.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {

            await api.post(
                "/payment/confirm",
                {
                    paymentIntentId: paymentIntent.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
 await api.delete("/cart/clear", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
            alert("Paiement réussi 🎉");
        }
          // 4. redirection (TOUJOURS EN DERNIER)
    window.location.href = "/success";
    };
    

    return (
        <form onSubmit={handleSubmit}>

            <div style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px"
            }}>
                <CardElement />
            </div>

            <button
                className="btn btn-success mt-3"
                disabled={!stripe}
            >
                Payer
            </button>

        </form>
    );
}

export default CheckoutForm;