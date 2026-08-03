import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/AdminSidebar.css";

function AdminSidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const closeSidebar = () => setIsOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: "fa-gauge", end: true },
        { to: "/admin/orders", label: "Commandes", icon: "fa-box" },
        { to: "/admin/products", label: "Produits", icon: "fa-screwdriver-wrench" },
        { to: "/admin/stock", label: "stock", icon: "fa-tags" },
        { to: "/admin/users", label: "Utilisateurs", icon: "fa-users" },
         { to: "/adminInvoices", label: "Factures", icon: "fa-users" },
            { to: "/admin/add/product", label: "ajout Produit", icon: "fa-users" },
    ];

    return (
        <>
            {/* Mobile top bar with hamburger */}
            <div className="admin-sidebar__topbar">
                <span className="admin-sidebar__topbar-title">
                    <span className="admin-sidebar__logo-accent">Farjallah</span> Admin
                </span>

                <button
                    className="admin-sidebar__toggle"
                    onClick={() => setIsOpen(true)}
                    aria-label="Ouvrir le menu"
                    aria-expanded={isOpen}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* Overlay (mobile only) */}
            <div
                className={`admin-sidebar__overlay ${isOpen ? "is-visible" : ""}`}
                onClick={closeSidebar}
            ></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`}>

                <div className="admin-sidebar__brand">
                    <span className="admin-sidebar__logo-accent">Farjallah</span> Auto
                    <button
                        className="admin-sidebar__close"
                        onClick={closeSidebar}
                        aria-label="Fermer le menu"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <nav className="admin-sidebar__nav">
                    <ul>
                        {links.map((link) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    end={link.end}
                                    onClick={closeSidebar}
                                    className={({ isActive }) =>
                                        `admin-sidebar__link ${isActive ? "is-active" : ""}`
                                    }
                                >
                                    <i className={`fa-solid ${link.icon}`}></i>
                                    <span>{link.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button className="admin-sidebar__logout" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Déconnexion</span>
                </button>

            </aside>
        </>
    );
}

export default AdminSidebar;