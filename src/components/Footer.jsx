import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/ihab-new-1.webp";
import "./css/Footer.css";

const FOOTER_CATEGORIES = [
  { slug: "huiles", label: "Huiles" },
  { slug: "filtre", label: "Filtres" },
  { slug: "freinage", label: "Freinage" },
  { slug: "embrayage", label: "Embrayage" },
  { slug: "amortisseur", label: "Suspension" },
  { slug: "batterie", label: "Batterie" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__container">

          {/* Brand */}
          <div className="site-footer__col site-footer__col--brand">
            <Link to="/" className="site-footer__brand">
              <img src={logoImage} alt="logo pièces auto" className="site-footer__logo" />
              <span className="site-footer__brand-text">
                Farjallah<span className="site-footer__brand-accent">Auto</span>
              </span>
            </Link>

            <p className="site-footer__desc">
              Votre spécialiste de pièces automobiles, huiles et accessoires.
              Qualité garantie, livraison rapide partout à Sousse.
            </p>

            <div className="site-footer__social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/21653659994" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">Liens rapides</h4>
            <ul className="site-footer__links">
              <li><Link to="/">Produits</Link></li>
              <li><Link to="/home">Accueil</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/cart">Mon panier</Link></li>
              <li><Link to="/login">Connexion</Link></li>
            </ul>
          </div>

          {/* Catégories */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">Catégories</h4>
            <ul className="site-footer__links">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/categorie/${cat.slug}`}>{cat.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">Contact</h4>
            <ul className="site-footer__contact">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                Région Sousse, Tunisie
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+21653659994">+216 53 659 994</a>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:ihab.farjallah@gmail.com">ihab.farjallah@gmail.com</a>
              </li>
              <li>
                <i className="fa-solid fa-clock"></i>
                Lun - Sam : 8h00 - 18h00
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__container site-footer__bottom-inner">
          <p>© {year} FarjallahAuto. Tous droits réservés.</p>
          <div className="site-footer__bottom-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/cgv">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;