import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logoImage from "../assets/images/ihab-new-1.webp"
import "./Navbar.css";
const CATEGORIES = [

  {
    slug: "huiles",
    label: "Huiles",
    icon: "fa-solid fa-oil-can"
  },

  {
    slug: "filtre",
    label: "Filtres",
    icon: "fa-solid fa-filter"
  },

  {
    slug: "freinage",
    label: "Freinage",
    icon: "fa-solid fa-car-burst"
  },

  {
    slug: "embrayage",
    label: "Embrayage",
    icon: "fa-solid fa-gears"
  },

  {
    slug: "amortisseur",
    label: "Suspension",
    icon: "fa-solid fa-truck-fast"
  },

  {
    slug: "eclairage",
    label: "Éclairage",
    icon: "fa-solid fa-lightbulb"
  },

  {
    slug: "batterie",
    label: "Batterie",
    icon: "fa-solid fa-car-battery"
  },

  {
    slug: "refroidissement",
    label: "Refroidissement",
    icon: "fa-solid fa-snowflake"
  },

  {
    slug: "peinture",
    label: "Peinture",
    icon: "fa-solid fa-spray-can-sparkles"
  },

  {
    slug: "transmission",
    label: "Transmission",
    icon: "fa-solid fa-gear"
  },

  {
    slug: "direction",
    label: "Direction",
    icon: "fa-solid fa-road"
  },

  {
    slug: "echappement",
    label: "Échappement",
    icon: "fa-solid fa-wind"
  }

];
function Navbar() {
  const navigate = useNavigate();
  const [catOpen, setCatOpen] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
const catRef = useRef(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const closeMenu = () => setIsOpen(false);
const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/?search=${encodeURIComponent(search)}`);

    setSearch("");
    closeMenu();
};
//effect category//
useEffect(() => {

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);

}, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Subtle shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {

  const handleClickOutside = (event) => {

    if(
      catRef.current &&
      !catRef.current.contains(event.target)
    ){
      setCatOpen(false);
    }

  };


  document.addEventListener(
    "mousedown",
    handleClickOutside
  );


  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);

  return (
    <nav className={`site-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-navbar__container">

        <Link className="site-navbar__brand" to="/" onClick={closeMenu}>
                      <img 
   src={logoImage}
   alt="logo pièces auto"
   className="logo-img"
/>
         
          <span className="site-navbar__brand-text">
            Farjallah<span className="site-navbar__brand-accent">Auto</span>
          </span>
        </Link>

        <button
          className={`site-navbar__toggle ${isOpen ? "is-open" : ""}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="site-navbar-menu"
        >
          <span className="site-navbar__toggle-bar"></span>
          <span className="site-navbar__toggle-bar"></span>
          <span className="site-navbar__toggle-bar"></span>
        </button>

        <div
          id="site-navbar-menu"
          className={`site-navbar__menu ${isOpen ? "is-open" : ""}`}
        >
          <ul className="site-navbar__links">
              <li>
              <NavLink
                className={({ isActive }) =>
                  `site-navbar__link ${isActive ? "is-active" : ""}`
                }
                to="/home"
                end
                onClick={closeMenu}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `site-navbar__link ${isActive ? "is-active" : ""}`
                }
                to="/"
                end
                onClick={closeMenu}
              >
                Produits
              </NavLink>
            </li>
{/*dropdown*/}
<li
  className="site-navbar__dropdown pt-3"
  ref={catRef}
  onMouseEnter={() => {
    if (!isMobile) setCatOpen(true);
  }}
  onMouseLeave={() => {
    if (!isMobile) setCatOpen(false);
  }}
>

  <button
    type="button"
    className={`pb-3 mb-2 site-navbar__link site-navbar__dropdown-toggle ${
      catOpen ? "is-active" : ""
    }`}
    onClick={() => {
      if (isMobile) {
        setCatOpen(!catOpen);
      }
    }}
    aria-expanded={catOpen}
  >
    Pièces

    <i
      className={`fa-solid fa-chevron-down site-navbar__caret ${
        catOpen ? "is-open" : ""
      }`}
    ></i>
  </button>

  <div
    className={`site-navbar__dropdown-panel ${
      catOpen ? "is-open" : ""
    }`}
  >
    {CATEGORIES.map((cat) => (
      <Link
        key={cat.slug}
        to={`/categorie/${cat.slug}`}
        className="site-navbar__dropdown-item"
        onClick={() => {
          setCatOpen(false);
          closeMenu();
        }}
      >
        <i className={cat.icon}></i>
        {cat.label}
      </Link>
    ))}
  </div>

</li>

{/*dropdown*/}
            {user?.role === "admin" && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `site-navbar__link ${isActive ? "is-active" : ""}`
                  }
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <form className="navbar-search" onSubmit={handleSearch}>

    <input
        type="text"
        placeholder="Rechercher par nom ou SKU..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
    </button>

</form>
          </ul>

          <div className="site-navbar__divider" aria-hidden="true"></div>

          <ul className="site-navbar__actions">
            {!token ? (
              <>
                <li>
                  <Link className="site-navbar__link" to="/login" onClick={closeMenu}>
                    Connexion
                  </Link>
                </li>

                <li>
                  <Link className="site-navbar__btn-primary" to="/register" onClick={closeMenu}>
                    Inscription
                  </Link>
                </li>
              </>
            ) : (
              <>
              <Link to="/register">
                <li className="site-navbar__greeting">
                  <i className="fa-regular fa-circle-user"></i>
                  Bonjour, {user?.firstName}
                </li></Link>

                <li>
                  <Link className="site-navbar__cart" to="/cart" onClick={closeMenu} aria-label="Voir le panier">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span className="site-navbar__cart-badge">{cartCount}</span>
                    )}
                  </Link>
                </li>

                <li>
                  <button className="site-navbar__btn-logout" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="site-navbar__overlay" onClick={closeMenu} aria-hidden="true"></div>
      )}
    </nav>
  );
}

export default Navbar;