import React from "react";
import "../components/css/Sidebar.css";
import { Link } from "react-router-dom";

const categories = [
  "Filtres",
  "Moteurs",
  "Amortisseur",
  "Embrayage",
  "Huiles",
  "Freinage",
  "Suspension",
  "Éclairage",
  "Batteries",
];

const Sidebar = ({ isOpen, onClose, activeCategory, onSelectCategory }) => {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">
          <h3 className="sidebar__title">Filtres</h3>
          <button className="sidebar__close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="sidebar__section">
          <h4 className="sidebar__section-title">Catégories</h4>
          <ul className="sidebar__list">
            <li
              className={`sidebar__item ${
                !activeCategory ? "is-active" : ""
              }`}
              onClick={() => onSelectCategory(null)}
            >
              Toutes les catégories
            </li>

            {categories.map((cat) => {
              const slug = cat.toLowerCase();
              const isActive = activeCategory === slug;

              return (
                <li
                  key={cat}
                  className={`sidebar__item ${isActive ? "is-active" : ""}`}
                >
                  <Link
                    to={`/categorie/${slug}`}
                    className="sidebar__link"
                    onClick={onClose}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

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