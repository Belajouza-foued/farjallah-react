import { useEffect, useRef, useState } from "react";
import "./css/Hero.css";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image: "/assets/images/ihab-3.png",
    title: "Pièces automobiles de qualité",
    text: "Toutes marques disponibles",
  },
  {
    image: "/assets/images/car-3.jpg",
    title: "Huiles moteur certifiées",
      slug: "huiles",
    text: "Protection maximale",
  },
  {
    image: "/assets/images/car-4.jpg",
    title: "Pièces automobiles de qualité",
    text: "Toutes marques disponibles",
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="hero">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero-slide ${index === active ? "is-active" : ""}`}
        >
          <img src={slide.image} alt={slide.title} loading={index === 0 ? "eager" : "lazy"} />
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <Link to="/" className="hero-btn">Voir plus</Link>
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            className={`hero-dot ${index === active ? "is-active" : ""}`}
            aria-label={`Aller à la diapositive ${index + 1}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
