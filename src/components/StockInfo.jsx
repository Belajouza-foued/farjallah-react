import { useState } from "react";
import "./css/StockInfo.css";
import { useNavigate } from "react-router-dom";
function StockInfo() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

 
 const handleSubmit = (e) => {
  e.preventDefault();

  navigate(`/?search=${query}`);
};

  return (
    <section className="stock-info" id="stock-info">
      <div className="stock-info__bg-strip" aria-hidden="true"></div>

      <div className="stock-info__container">
        <div className="stock-info__grid">

          <div className="stock-info__text">
            <span className="stock-info__eyebrow">
              <i className="fa-solid fa-circle-info"></i>
              Bon à savoir
            </span>

            <h2 className="stock-info__title">
              Les pièces affichées sont des <span className="stock-info__title-accent">modèles d'exemple</span>
            </h2>

            <p className="stock-info__lead">
              Chaque photo représente une catégorie de pièce, pas la liste complète de notre stock.
              Nous disposons de bien plus de références, pour toutes marques et tous modèles de véhicules.
            </p>

            <ul className="stock-info__points">
              <li>
                <i className="fa-solid fa-warehouse"></i>
                <span>Un stock beaucoup plus large que ce qui est affiché sur le site</span>
              </li>
              <li>
                <i className="fa-solid fa-car"></i>
                <span>Compatible avec la majorité des marques et modèles, anciens et récents</span>
              </li>
              <li>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Une pièce introuvable en ligne ? Nous la cherchons pour vous, partout où c'est possible</span>
              </li>
            </ul>
          </div>

          <div className="stock-info__card">
            <div className="stock-info__card-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <h3 className="stock-info__card-title">Vous cherchez une pièce précise ?</h3>
            <p className="stock-info__card-text">
              Dites-nous la marque, le modèle et l'année de votre véhicule, on la trouve pour vous.
            </p>

           <form className="stock-info__form" onSubmit={handleSubmit}>

  <label
    className="visually-hidden"
    htmlFor="stock-search"
  >
    Rechercher un produit
  </label>

  <input
    type="text"
    id="stock-search"
    className="stock-info__input"
    placeholder="Rechercher par nom ou SKU..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

  <button
    type="submit"
    className="stock-info__submit"
    aria-label="Rechercher"
  >
    <i className="fa-solid fa-magnifying-glass"></i>
  </button>

</form>

            <a href="https://wa.me/21653659994" className="stock-info__whatsapp" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
              Demander sur WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StockInfo;
