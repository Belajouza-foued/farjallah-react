
import React from "react";
import "./css/Sidebar.css";

const categories = [
  "Filtres",
  "Moteurs",
  "Amortisseur",
  "embrayage",
  "huiles",
  "freinage",
  "Suspension",
  "eclairage",
  "Batteries",
];

const Sidebar = ({ isOpen, onClose, activeCategory, onSelectCategory }) => {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

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

            {categories.map((cat) => (
              <li
                key={cat}
                className={`sidebar__item ${
                  activeCategory === cat ? "is-active" : ""
                }`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__section">
          <h4 className="sidebar__section-title">Disponibilité</h4>
          <ul className="sidebar__list">
            <li className="sidebar__item">
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