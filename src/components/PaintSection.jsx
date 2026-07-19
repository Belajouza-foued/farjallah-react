import "./css/PaintSection.css";

const STEPS = [
  { title: "Primaire", text: "Préparation de la surface", image: "/assets/images/peinture-1.jpg" },
  { title: "Peinture base", text: "Couleur principale carrosserie", image: "/assets/images/peinture-2.png" },
  { title: "Vernis", text: "Protection et brillance", image: "/assets/images/peinture-3.png" },
  { title: "Retouche", text: "Petites réparations peinture", image: "/assets/images/peinture-4.webp" },
];

function PaintSection() {
  return (
    <section className="paint-section">
      <div className="paint-overlay" aria-hidden="true"></div>

      <div className="container">
        <h2 className="section-title">Peinture Automobile</h2>
        <p className="section-subtitle">
          Produits de peinture professionnelle pour carrosserie et finition.
        </p>

        <div className="row mt-5 g-4 justify-content-center">
          {STEPS.map((step) => (
            <div key={step.title} className="col-lg-3 col-md-6 col-12">
              <div className="paint-card">
                <img src={step.image} alt={step.title} loading="lazy" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaintSection;
