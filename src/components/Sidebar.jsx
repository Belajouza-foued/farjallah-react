import React, { useEffect, useState } from "react";
import "./css/Sidebar.css";
import { Link } from "react-router-dom";

/* ── Marque : mets ton logo dans `logo` (ex: "/assets/images/logo.png").
      Sans logo, une icône animée est affichée. ── */
const BRAND = { name: "Farjallah", tagline: "Pièces auto", logo: "" };

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

const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
];

const DEFAULT_FILTERS = {
  sort: "relevance",
  inStock: false,
  promo: false,
  priceMin: "",
  priceMax: "",
};

const normalize = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* Composants définis HORS de Sidebar : sinon ils sont recréés à chaque
   frappe et les champs perdent le focus. */
const Section = ({ id, title, icon, isOpen, onToggle, children }) => (
  <div className={`sidebar__section ${isOpen ? "is-open" : ""}`}>
    <button
      type="button"
      className="sidebar__section-toggle"
      aria-expanded={isOpen}
      aria-controls={`sb-${id}`}
      onClick={() => onToggle(id)}
    >
      <span className="sidebar__section-title">
        <i className={icon} aria-hidden="true"></i>
        {title}
      </span>
      <i className="fa-solid fa-chevron-down sidebar__chevron" aria-hidden="true"></i>
    </button>

    <div className="sidebar__collapse" id={`sb-${id}`}>
      <div className="sidebar__collapse-inner">{children}</div>
    </div>
  </div>
);

const Choice = ({ type, name, id, checked, onChange, children }) => (
  <li className="sidebar__filter">
    <label className="sidebar__check" htmlFor={id}>
      <input type={type} name={name} id={id} checked={checked} onChange={onChange} />
      <span>{children}</span>
    </label>
  </li>
);

/* onFilterChange(filters) est appelé à chaque changement :
   { sort, inStock, promo, priceMin, priceMax } */
const Sidebar = ({ isOpen, onClose, activeCategory, onSelectCategory, onFilterChange }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [query, setQuery] = useState("");
  const [openSections, setOpenSections] = useState({
    categories: true,
    sort: true,
    availability: true,
    price: false,
  });

  const toggleSection = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const update = (patch) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onFilterChange?.(next);
  };

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    onFilterChange?.(DEFAULT_FILTERS);
  };

  const activeCount = [
    filters.sort !== "relevance",
    filters.inStock,
    filters.promo,
    filters.priceMin !== "" || filters.priceMax !== "",
  ].filter(Boolean).length;

  const visibleCategories = categories.filter((c) =>
    normalize(c.name).includes(normalize(query.trim()))
  );

  // Mobile : Échap ferme le tiroir + on bloque le scroll de la page
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        aria-label="Catégories et filtres"
      >
        {/* Logo + fermer (mobile) */}
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <span className="sidebar__logo">
              {BRAND.logo ? (
                <img src={BRAND.logo} alt={BRAND.name} />
              ) : (
                <i className="fa-solid fa-gears" aria-hidden="true"></i>
              )}
            </span>
            <span className="sidebar__brand-text">
              <strong>{BRAND.name}</strong>
              <small>{BRAND.tagline}</small>
            </span>
          </div>

          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Catégories */}
        <Section
          id="categories"
          title="Catégories"
          icon="fa-solid fa-layer-group"
          isOpen={openSections.categories}
          onToggle={toggleSection}
        >
          <div className="sidebar__search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une catégorie"
              aria-label="Rechercher une catégorie"
            />
            {query && (
              <button
                type="button"
                className="sidebar__search-clear"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <ul className="sidebar__list">
            {!query && (
              <li
                className={`sidebar__item ${!activeCategory ? "is-active" : ""}`}
                style={{ "--i": 0 }}
              >
                <Link to="/products" className="sidebar__link" onClick={onClose}>
                  <i className="fa-solid fa-border-all"></i>
                  <span>Toutes les catégories</span>
                </Link>
              </li>
            )}

            {visibleCategories.map((cat, idx) => (
              <li
                key={cat.slug}
                className={`sidebar__item ${activeCategory === cat.slug ? "is-active" : ""}`}
                style={{ "--i": idx + 1 }}
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

            {visibleCategories.length === 0 && (
              <li className="sidebar__empty">Aucune catégorie trouvée</li>
            )}
          </ul>
        </Section>

        {/* Trier par (radio) */}
        <Section
          id="sort"
          title="Trier par"
          icon="fa-solid fa-arrow-down-wide-short"
          isOpen={openSections.sort}
          onToggle={toggleSection}
        >
          <ul className="sidebar__list">
            {SORT_OPTIONS.map((opt) => (
              <Choice
                key={opt.value}
                type="radio"
                name="sort"
                id={`sort-${opt.value}`}
                checked={filters.sort === opt.value}
                onChange={() => update({ sort: opt.value })}
              >
                {opt.label}
              </Choice>
            ))}
          </ul>
        </Section>

        {/* Disponibilité (checkbox) */}
        <Section
          id="availability"
          title="Disponibilité"
          icon="fa-solid fa-box-open"
          isOpen={openSections.availability}
          onToggle={toggleSection}
        >
          <ul className="sidebar__list">
            <Choice
              type="checkbox"
              id="inStock"
              checked={filters.inStock}
              onChange={(e) => update({ inStock: e.target.checked })}
            >
              En stock
            </Choice>
            <Choice
              type="checkbox"
              id="promo"
              checked={filters.promo}
              onChange={(e) => update({ promo: e.target.checked })}
            >
              En promotion
            </Choice>
          </ul>
        </Section>

        {/* Prix */}
        <Section
          id="price"
          title="Prix"
          icon="fa-solid fa-tag"
          isOpen={openSections.price}
          onToggle={toggleSection}
        >
          <div className="sidebar__price">
            <div className="sidebar__price-field">
              <input
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Min"
                aria-label="Prix minimum"
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: e.target.value })}
              />
              <span>DT</span>
            </div>
            <span className="sidebar__price-sep">—</span>
            <div className="sidebar__price-field">
              <input
                type="number"
                min="0"
                inputMode="numeric"
                placeholder="Max"
                aria-label="Prix maximum"
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: e.target.value })}
              />
              <span>DT</span>
            </div>
          </div>
        </Section>

        {/* Actions */}
        <div className="sidebar__footer">
          <button
            type="button"
            className="sidebar__reset"
            onClick={reset}
            disabled={activeCount === 0}
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
            Réinitialiser
            {activeCount > 0 && <b>{activeCount}</b>}
          </button>

          <button type="button" className="sidebar__apply" onClick={onClose}>
            Voir les résultats
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;