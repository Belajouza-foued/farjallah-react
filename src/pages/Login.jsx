import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../api/axios";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Connexion réussie");

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message || "Erreur de connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Connexion</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group mb-3">

            <span className="input-group-text">
              <FaEnvelope />
            </span>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group mb-3">

            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-primary btn-login"
            type="submit"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        <p className="mt-3 text-center">
          Pas encore de compte ?
          <Link to="/register"> S'inscrire</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;