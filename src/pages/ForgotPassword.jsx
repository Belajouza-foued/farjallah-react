
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/forgot-password`,
        { email }
      );

      setMessage(
        response.data.message ||
          "Si cette adresse existe, un lien de réinitialisation vous sera envoyé."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="mx-auto"
        style={{
          maxWidth: "500px",
        }}
      >
        <div className="card shadow-sm border-0 p-4">
          <h2 className="text-center mb-3">
            Mot de passe oublié ?
          </h2>

          <p className="text-muted text-center mb-4">
            Entrez votre adresse email pour recevoir un lien
            permettant de réinitialiser votre mot de passe.
          </p>

          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Adresse email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="exemple@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Envoi en cours..."
                : "Envoyer le lien"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
