import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar__container">

        <div className="top-bar__left">

          <span className="top-bar__item">
            <i className="bi bi-truck"></i>
            Livraison gratuite dès 150 DT d'achat
          </span>

          <span className="top-bar__item">
            <i className="bi bi-geo-alt"></i>
            Région Sousse
          </span>

          <a
            href="mailto:ihab.farjallah@gmail.com"
            className="top-bar__item top-bar__item--link"
          >
            <i className="bi bi-envelope"></i>
            ihab.farjallah@gmail.com
          </a>

          <a
            href="tel:+21653659994"
            className="top-bar__item top-bar__item--link"
          >
            <i className="bi bi-telephone"></i>
            +216 53 659 994
          </a>

        </div>

        <div className="top-bar__right">

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="top-bar__social"
          >
            <i className="bi bi-facebook"></i>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="top-bar__social"
          >
            <i className="bi bi-instagram"></i>
          </a>

          <a
            href="https://wa.me/21653659994"
            target="_blank"
            rel="noopener noreferrer"
            className="top-bar__social"
          >
            <i className="bi bi-whatsapp"></i>
          </a>

        </div>

      </div>
    </div>
  );
};

export default TopBar;