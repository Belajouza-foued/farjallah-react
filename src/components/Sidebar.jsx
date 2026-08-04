import React from "react";
import "./css/Sidebar.css";
import { Link } from "react-router-dom";

const CATEGORY_ICONS = {
  filtre: "fa-solid fa-filter",
  moteurs: "fa-solid fa-car",
  amortisseur: "fa-solid fa-truck-fast",
  embrayage: "fa-solid fa-gears",
  huiles: "fa-solid fa-oil-can",
  freinage: "fa-solid fa-car-burst",
  suspension: "fa-solid fa-truck-fast",
  eclairage: "fa-solid fa-lightbulb",
batteries: "fa-solid fa-battery-full",
  refroidissement: "fa-solid fa-snowflake",
  transmission: "fa-solid fa-gear",
  direction: "fa-solid fa-road",
  peinture: "fa-solid fa-spray-can-sparkles",
  echappement: "fa-solid fa-wind",
};

const categories = [
  { name: "Filtres", slug: "filtre" },
  { name: "Moteurs", slug: "moteurs" },
  { name: "Amortisseur", slug: "amortisseur" },
  { name: "Embrayage", slug: "embrayage" },
  { name: "Huiles", slug: "huiles" },
  { name: "Freinage", slug: "freinage" },
  { name: "Suspension", slug: "suspension" },
  { name: "Éclairage", slug: "eclairage" },
  { name: "Batteries", slug: "batteries" },
  { name: "Refroidissement", slug: "refroidissement" },
  { name: "Transmission", slug: "transmission" },
  { name: "Direction", slug: "direction" },
  { name: "Peinture", slug: "peinture" },
  { name: "Échappement", slug: "echappement" },
];

const Sidebar = ({ isOpen, onClose, activeCategory, onSelectCategory }) => {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>

        <div className="sidebar__header">
          <h3 className="sidebar__title">Categories</h3>
          <button className="sidebar__close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Catégories */}
        <div className="sidebar__section">
      

          <ul className="sidebar__list">
            <li className={`sidebar__item ${!activeCategory ? "is-active" : ""}`}>
              <Link to="/products" className="sidebar__link" onClick={onClose}>
                <i className="fa-solid fa-border-all"></i>
                <span>Catégories</span>
              </Link>
            </li>

            {categories.map((cat) => (
              <li
                key={cat.slug}
                className={`sidebar__item ${activeCategory === cat.slug ? "is-active" : ""}`}
              >
                <Link
                  to={`/categorie/${cat.slug}`}
                  className="sidebar__link"
                  onClick={onClose}
                >
                  <i className={CATEGORY_ICONS[cat.slug]}></i>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Disponibilité */}
        <div className="sidebar__section">
          <h4 className="sidebar__section-title">Disponibilité</h4>

          <ul className="sidebar__list">
            <li className="sidebar__item sidebar__item--checkbox">
              <input type="checkbox" id="inStock" />
              <label htmlFor="inStock">En stock</label>
            </li>
          </ul>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;