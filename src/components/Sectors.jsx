import { useState } from "react";
import "./css/Sectors.css";

const SECTORS = [
  {
    id: "moteur",
    title: "Moteurs",
    image: "/assets/images/moteur-1.jpg",
    text: "Filtres à huile, filtres à air, filtres à carburant, bougies d'allumage, courroie de distribution, pompe à eau, joint de culasse, pistons, segments, bielles, vilebrequin, soupapes, arbre à cames, injecteurs, turbo, radiateur moteur, pompe à huile, capteurs moteur, culasse et bloc moteur.",
  },
  {
    id: "frein",
    title: "Freins",
    image: "/assets/images/frein.png",
    text: "Plaquettes de frein, disques de frein, tambours, étriers, maître-cylindre, liquide de frein, flexibles de frein, câbles de frein à main, servofrein, capteurs ABS, cylindres de roue, mâchoires de frein, kits de réparation, supports d'étrier, roulements de roue et accessoires de freinage.",
  },
  {
    id: "transmission",
    title: "Transmissions",
    image: "/assets/images/embrayage.png",
    text: "Kit embrayage, disque d'embrayage, butée, volant moteur, cardans, boîte de vitesses, différentiel, arbre de transmission, joints homocinétiques, soufflets et supports de boîte.",
  },
  {
    id: "suspension",
    title: "Suspensions",
    image: "/assets/images/amortissement.png",
    text: "Amortisseurs, ressorts, coupelles, triangles de suspension, rotules, biellettes de direction, silentblocs, barres stabilisatrices et roulements.",
  },
  {
    id: "eclairage",
    title: "Eclairages",
    image: "/assets/images/ampoule.png",
    text: "Ampoules, phares avant, feux arrière, antibrouillards, clignotants, feux stop, feux LED, relais et fusibles.",
  },
  {
    id: "peinture",
    title: "Peintures",
    image: "/assets/images/peinture-2.png",
    text: "Peinture carrosserie, vernis, apprêt, diluant, mastic, polish, bombe peinture, papiers abrasifs et accessoires de finition.",
  },
  {
    id: "batterie",
    title: "Batteries",
    image: "/assets/images/battery.webp",
    text: "Batteries 12V, batteries AGM, batteries Start-Stop, cosses, chargeurs, câbles de démarrage et testeurs de batterie.",
  },
  {
    id: "refroidissement",
    title: "Liquides de Refroidissement",
    image: "/assets/images/refroidissement.avif",
    text: "Liquide de refroidissement, radiateur, thermostat, pompe à eau, ventilateur, vase d'expansion, durites et sondes de température.",
  },
  {
    id: "huiles",
    title: "Huiles",
    image: "/assets/images/gastrol-1.jpg",
    text: "Huile moteur, huile boîte de vitesses, huile de direction assistée, huile hydraulique, huile de transmission, additifs et lubrifiants spécialisés.",
  },
];

function SectorCard({ sector }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="sector-card">
        <div className="sector-bg">
          <img src={sector.image} alt={sector.title} loading="lazy" />
        </div>

        <div className="sector-content">
          <a href="/piece">{sector.title}</a>

          <button
            className="sector-btn"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            {open ? "Voir moins" : "Voir plus"}
          </button>

          <div className={`sector-details ${open ? "is-open" : ""}`}>
            <p className="sector-text">{sector.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sectors() {
  return (
    <section className="sector-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Nos Secteurs Auto</h2>
          <p>Pièces, huiles, peinture et accessoires pour tous véhicules</p>
        </div>

        <div className="row g-4">
          {SECTORS.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Sectors;
