import { useEffect, useState } from "react";
import "./css/About.css";

const SLIDES = [
  { src: "/assets/images/ihab-1.jpg", alt: "Magasin auto Farjallah" },
  { src: "/assets/images/car-2.jpg", alt: "Intérieur du magasin" },
  { src: "/assets/images/car-4.jpg", alt: "Sélection de pièces" },
];

function About() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="about-section container py-5">
      <div className="row align-items-center g-5">

        <div className="col-lg-6 col-md-12">
          <h2 className="mb-4">À propos de Farjallah Auto</h2>

          <p>
            Farjallah Auto est un spécialiste dans la vente de pièces automobiles,
            huiles moteur et accessoires pour tous types de véhicules.
          </p>

          <p>
            Nous travaillons avec des marques reconnues comme Peugeot, Renault,
            Citroën et Isuzu pour garantir qualité et fiabilité.
          </p>

          <ul className="about-list">
            <li><i className="fa-solid fa-check"></i> Pièces d'origine et adaptable</li>
            <li><i className="fa-solid fa-check"></i> Huiles moteur certifiées</li>
            <li><i className="fa-solid fa-check"></i> Service rapide et professionnel</li>
            <li><i className="fa-solid fa-check"></i> Prix compétitifs</li>
          </ul>

          <a href="/contact" className="about-btn mt-3">Nous contacter</a>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="about-carousel">
            {SLIDES.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`about-carousel__img ${index === active ? "is-active" : ""}`}
                loading="lazy"
              />
            ))}

            <div className="about-carousel__dots">
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  className={`about-carousel__dot ${index === active ? "is-active" : ""}`}
                  aria-label={`Image ${index + 1}`}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
