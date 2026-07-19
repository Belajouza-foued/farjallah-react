import { Link } from "react-router-dom";
import "./css/CategorySection.css";

const categories = [
  {
    name: "Freinage",
    slug: "freinage",
    image: "/assets/images/frein-1.png",
    icon: "fa-solid fa-life-ring",
  },
  {
    name: "amortisseur",
    slug: "amortisseur",
    image: "/assets/images/amortissement-2.png",
    icon: "fa-solid fa-car-side",
  },
  {
    name: "Filtre",
    slug: "filtre",
    image: "/assets/images/filtre-1.jpg",
    icon: "fa-solid fa-filter",
  },
  {
    name: "Distribution",
    slug: "distribution",
    image: "/assets/images/croix-2.png",
    icon: "fa-solid fa-gears",
  },
  {
    name: "embrayage",
    slug: "embrayage",
    image: "/assets/images/disque-embrayage.jpg",
    icon: "fa-solid fa-circle-notch",
  },
  
  {
    name: "huiles",
    slug: "huiles",
    image: "/assets/images/mannol-1.jpg",
    icon: "fa-solid fa-oil-can",
  },
];

function CategorySection() {
  return (
    <section className="category-home py-5">
      <div className="container">

        <header className="category-home__head">
          <span className="category-home__eyebrow">
            <i className="fa-solid fa-layer-group"></i>
            Nos catégories
          </span>
          <h2 className="category-home__title">
            Trouvez la pièce <span>qu'il vous faut</span>
          </h2>
          <p className="category-home__subtitle">
            Parcourez nos rayons par catégorie et accédez directement aux pièces compatibles avec votre véhicule.
          </p>
        </header>

        <div className="row g-4">

          {categories.map((cat) => (
            <div className="col-lg-4 col-md-6" key={cat.slug}>
              <Link to={`/categorie/${cat.slug}`} className="category-card">

                <span className="category-card__icon">
                  <i className={cat.icon}></i>
                </span>

                <div className="category-card__img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>

                <div className="category-card__footer">
                  <h3>{cat.name}</h3>
                  <span className="category-card__link">
                    Voir les produits
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>

              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default CategorySection;