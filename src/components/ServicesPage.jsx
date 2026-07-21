import React, { useState, useEffect, useRef } from "react";
import "./css/ServicesPage.css";
import ContactSection from "./ContactSection";
import { Link } from "react-router-dom";

const SERVICES_DETAIL = [
  {
    id: "recherche",
    badge: "Gratuit",
    title: "Recherche de pièces",
    text: "Votre pièce introuvable ? Notre équipe la localise partout en Tunisie, même pour véhicules anciens.",
    points: ["Pièces rares et anciens modèles", "Recherche sous 24-48h", "Sans frais supplémentaires"],
  },
  {
    id: "livraison",
    featured: true,
    badge: "Populaire",
    title: "Livraison gratuite Sousse",
    text: "Livraison rapide et gratuite partout à Sousse — Kalaâ, Cité Riadh, Sidi Bouali, Centre Ville.",
    points: ["Gratuit partout à Sousse", "24 à 48 heures ouvrées", "Suivi de colis inclus"],
  },
  {
    id: "conseil",
    badge: "Expert",
    title: "Conseil technique",
    text: "Nos experts vous guident pour choisir la bonne pièce, huile ou peinture selon votre véhicule.",
    points: ["Disponibles Lun-Sam", "Conseils personnalisés gratuits", "Compatibilité garantie"],
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Cherchez", text: "Recherchez votre pièce ou envoyez-nous la référence." },
  { num: "02", title: "Confirmez", text: "On vérifie la compatibilité et confirme prix et disponibilité." },
  { num: "03", title: "Recevez", text: "Livraison gratuite chez vous à Sousse sous 24-48h." },
  { num: "04", title: "Profitez", text: "Votre véhicule est opérationnel. SAV disponible." },
];

const STATS = [
  { target: 12000, suffix: "+", label: "Pièces disponibles" },
  { target: 48, suffix: "h", label: "Délai livraison max" },
  { target: 100, suffix: "%", label: "Livraison gratuite" },
  { target: 5000, suffix: "+", label: "Clients satisfaits" },
];

const FAQS = [
  { q: "La livraison est vraiment gratuite partout à Sousse ?", a: "Oui, 100% gratuite partout à Sousse. Délai 24 à 48 heures ouvrées." },
  { q: "Que faire si ma pièce n'est pas en stock ?", a: "Contactez-nous avec la référence — on la cherche partout en Tunisie sous 24-48h sans frais." },
  { q: "Comment choisir la bonne huile pour mon véhicule ?", a: "Donnez-nous marque, modèle et année — notre équipe recommande la viscosité adaptée, gratuitement." },
  { q: "Les pièces sont-elles d'origine ?", a: "Nous proposons pièces OEM et équivalents de qualité. Toutes garanties authentiques." },
  { q: "Puis-je retourner une pièce ?", a: "Oui, sous 14 jours si la pièce est non montée et dans son emballage d'origine." },
];

// ---- Compteur animé ----
const useCountUp = (target, active) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return value;
};

const StatItem = ({ stat, active }) => {
  const value = useCountUp(stat.target, active);
  return (
    <div className="stat-item">
      <span className="stat-num">{value.toLocaleString("fr-FR")}</span>
      <span className="stat-sym">{stat.suffix}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
};

const ServicesPage = () => {
 const [openFaq, setOpenFaq] = useState(null);

const statsRef = useRef(null);

const [statsActive, setStatsActive] = useState(false);


useEffect(() => {

  const observer = new IntersectionObserver(

    ([entry]) => {

      if (entry.isIntersecting) {
        setStatsActive(true);
      }

    },

    {
      threshold: 0.3
    }

  );

  if (statsRef.current) {

    observer.observe(statsRef.current);

  }

  return () => observer.disconnect();

}, []);

  // Scroll vers l'ancre au chargement (ex: /services#devis)



 
 

  return (
    <>
      {/* HERO */}
      <section className="sp-hero">
        <div className="sp-hero__strip" aria-hidden="true"></div>
        <div className="sp-hero__container">
          <span className="sp-eyebrow sp-eyebrow--on-navy">
            <svg viewBox="0 0 24 24" className="sp-eyebrow-icon" aria-hidden="true">
              <path d="M12 2 L14.5 9 H22 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 H9.5 Z" />
            </svg>
            Ce que nous faisons
          </span>

          <h1 className="sp-hero__title">
            Nos <span className="sp-title-accent">Services</span>
          </h1>

          <p className="sp-hero__subtitle">
            De la recherche de pièces introuvables à la livraison gratuite à Sousse —
            on s'occupe de tout.
          </p>

          <div className="sp-hero__btns">
            <a href="#services-detail" className="sp-btn sp-btn--yellow">
              Voir nos services
            </a>
            <Link to="/contact" className="sp-btn sp-btn--outline">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="sp-stats" ref={statsRef}>
        <div className="sp-stats__grid">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={statsActive} />
          ))}
        </div>
      </div>

      {/* SERVICES DETAIL */}
      <section className="sp-services" id="services-detail">
        <div className="sp-services__container">
          <header className="sp-section-head">
            <span className="sp-eyebrow">
              <svg viewBox="0 0 24 24" className="sp-eyebrow-icon" aria-hidden="true">
                <path d="M12 2 L14.5 9 H22 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 H9.5 Z" />
              </svg>
              Nos services
            </span>
            <h2 className="sp-section-title">
              Tout ce dont vous avez <span className="sp-title-accent">besoin</span>
            </h2>
          </header>

          <div className="sp-services__grid">
            {SERVICES_DETAIL.map((s) => (
              <article
                className={`sp-service-card ${s.featured ? "is-featured" : ""}`}
                key={s.id}
              >
                {s.badge && <span className="sp-badge">{s.badge}</span>}
                <h3 className="sp-service-card__title">{s.title}</h3>
                <p className="sp-service-card__text">{s.text}</p>
                <ul className="sp-service-card__list">
                  {s.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sp-process">
        <div className="sp-process__container">
          <header className="sp-section-head">
            <span className="sp-eyebrow sp-eyebrow--on-navy">Processus</span>
            <h2 className="sp-section-title sp-section-title--on-navy">
              Comment ça <span className="sp-title-accent">marche</span> ?
            </h2>
          </header>

          <div className="sp-process__grid">
            {PROCESS_STEPS.map((step) => (
              <div className="sp-process-step" key={step.num}>
                <div className="sp-process-step__badge">
                  <svg className="sp-process-step__ring" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="56" />
                  </svg>
                  <span className="sp-process-step__num">{step.num}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVIS */}
   <ContactSection/>

      {/* FAQ */}
      <section className="sp-faq">
        <div className="sp-faq__container">
          <header className="sp-section-head">
            <span className="sp-eyebrow">FAQ</span>
            <h2 className="sp-section-title">
              Questions <span className="sp-title-accent">fréquentes</span>
            </h2>
          </header>

          <div className="sp-faq__list">
            {FAQS.map((faq, i) => (
              <div className="sp-faq-item" key={faq.q}>
                <button className="sp-faq-item__btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`sp-faq-item__icon ${openFaq === i ? "is-open" : ""}`}>+</span>
                </button>
                <div className={`sp-faq-item__content ${openFaq === i ? "is-open" : ""}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="sp-cta__strip" aria-hidden="true"></div>
        <div className="sp-cta__container">
          <h2>Prêt à commander ?</h2>
          <p>Votre pièce est à portée de clic — livraison gratuite à Sousse</p>
          <div className="sp-cta__btns">
            <a href="#devis" className="sp-btn sp-btn--yellow">Demander un devis gratuit</a>
            <a href="/products" className="sp-btn sp-btn--outline">Voir nos produits</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;