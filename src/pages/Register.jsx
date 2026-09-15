import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/register.css";
import registerCar from "../assets/images/contact-car-1.avif";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Erreur lors de l'inscription"
      );
    }
  };



  return (
    <section className="register-page">

      <div className="container">

        <div className="row register-box shadow">

          {/* Image */}

          <div className="col-lg-6 register-left">

   <img 
  src={registerCar}
  alt="Voiture Farjallah Auto"
  className="contact-car-register"
/>

            <h2>Bienvenue chez Farjallah Auto</h2>

            <p>
              Créez votre compte pour commander rapidement toutes vos
              pièces automobiles.
            </p>

          </div>

          {/* Formulaire */}

          <div className="col-lg-6 register-right">

            <h3 className="mb-4">
              Créer un compte
            </h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label>Prénom</label>

                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Nom</label>

                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Email</label>

                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Téléphone</label>

                <input
                  className="form-control"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-4">

                <label>Mot de passe</label>

                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                className="btn register-btn w-100"
                type="submit"
              >
                <i className="fa-solid fa-user-plus me-2"></i>
                S'inscrire
              </button>

            </form>

            <div className="text-center mt-4">

              Vous avez déjà un compte ?

              <Link to="/login" className="login-link">
                Connexion
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;