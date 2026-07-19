import "./css/Services.css";

const SERVICES = [
  {
    title: "Pièces Auto",
    text: "Large gamme de pièces détachées d'origine et compatibles, pour toutes marques et tous modèles.",
    icon: (
      <>
        <path d="M40.8 8.7l-3.4 5.9c-1.4-.5-2.9-.8-4.4-1l-1.4-6.6c-2.4-.3-4.8-.3-7.2 0l-1.4 6.6c-1.5.2-3 .5-4.4 1l-3.4-5.9c-2.2 1-4.2 2.3-6.1 3.8l2.3 6.4c-1.1 1-2.1 2.1-3 3.3l-6.6-1.1c-1.3 2.1-2.3 4.4-3 6.8l5.4 4c-.3 1.5-.4 3-.4 4.5l-5.9 3.1c.2 2.4.7 4.7 1.5 6.9l6.7-.4c.7 1.4 1.5 2.6 2.4 3.8l-3.5 5.7c1.6 1.8 3.4 3.4 5.3 4.8l5.3-3.9c1.3.8 2.7 1.5 4.1 2l.4 6.7c2.3.5 4.6.7 7 .6l1.4-6.6c1.5-.1 3-.4 4.4-.8l3.7 5.6c2.2-.8 4.3-1.9 6.2-3.2l-2-6.4c1.2-1 2.3-2 3.3-3.2l6.5 1.6c1.4-2 2.6-4.2 3.4-6.5l-5.1-4.4c.4-1.5.6-3 .6-4.6l5.7-3.5c-.1-2.4-.5-4.7-1.2-7l-6.7.1c-.6-1.4-1.3-2.7-2.2-3.9l3.2-5.9c-1.7-1.7-3.6-3.2-5.6-4.4z" />
        <circle cx="32" cy="32" r="9" />
      </>
    ),
  },
  {
    title: "Huiles",
    text: "Huiles moteur multigrades, minérales et synthétiques, adaptées à votre véhicule et à votre kilométrage.",
    icon: (
      <>
        <path d="M32 6c6 9 13 17 13 27a13 13 0 1 1-26 0c0-10 7-18 13-27z" />
        <rect x="20" y="44" width="24" height="14" rx="2" />
        <line x1="26" y1="44" x2="26" y2="58" />
        <line x1="38" y1="44" x2="38" y2="58" />
      </>
    ),
  },
  {
    title: "Peinture",
    text: "Peintures carrosserie teintées sur mesure, vernis et accessoires de retouche professionnels.",
    icon: (
      <>
        <path d="M18 30 L40 8 L54 22 L32 44 Z" />
        <path d="M32 44 L26 50 a6 6 0 1 1 -8.5 -8.5 Z" />
        <line x1="34" y1="14" x2="48" y2="28" />
      </>
    ),
  },
  {
    title: "Batterie",
    text: "Batteries fiables et performantes, testées et installées avec contrôle du système de charge.",
    icon: (
      <>
        <rect x="12" y="22" width="40" height="28" rx="3" />
        <line x1="22" y1="16" x2="22" y2="22" />
        <line x1="42" y1="16" x2="42" y2="22" />
        <line x1="26" y1="33" x2="34" y2="33" />
        <line x1="30" y1="29" x2="30" y2="37" />
        <line x1="40" y1="33" x2="46" y2="33" />
      </>
    ),
  },
  {
    title: "Liquide de Refroidissement",
    text: "Liquides de refroidissement longue durée pour protéger votre moteur du gel et de la surchauffe.",
    icon: (
      <>
        <path d="M32 6c7 11 16 22 16 33a16 16 0 1 1 -32 0c0-11 9-22 16-33z" />
        <path d="M26 36c0 5 3 8 6 9" />
      </>
    ),
  },
  {
    title: "Filtres",
    text: "Filtres à huile, à air, à carburant et d'habitacle pour un moteur protégé et performant.",
    icon: (
      <>
        <path d="M20 10h24l-8 16v22a4 4 0 0 1-8 0V26z" />
        <line x1="22" y1="18" x2="42" y2="18" />
      </>
    ),
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__bg-strip" aria-hidden="true"></div>

      <div className="services__container">
        <header className="services__head">
          <span className="services__eyebrow">
            <svg viewBox="0 0 24 24" className="services__eyebrow-icon" aria-hidden="true">
              <path d="M12 2 L14.5 9 H22 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 H9.5 Z" />
            </svg>
            Nos services
          </span>

          <h2 className="services__title">
            Tout pour entretenir<br />
            <span className="services__title-accent">votre véhicule</span>
          </h2>

          <p className="services__subtitle">
            Pièces d'origine, fluides de qualité et conseils d'experts : retrouvez ici
            tout ce dont votre voiture a besoin, sous un même toit.
          </p>
        </header>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-card__badge">
                <svg className="service-card__ring" viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="56" />
                </svg>
                <svg className="service-card__icon" viewBox="0 0 64 64" aria-hidden="true">
                  {service.icon}
                </svg>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.text}</p>
            </article>
          ))}
        </div>

        <a href="/contact" className="services__cta">
          Demander un devis
          <svg viewBox="0 0 24 24" className="services__cta-icon" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Services;
