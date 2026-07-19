import { useEffect, useRef, useState } from "react";
import "./css/Stats.css";

const STATS = [
  { label: "Clients satisfaits", target: 500 },
  { label: "Pièces disponibles", target: 1200 },
  { label: "Marques partenaires", target: 50 },
];

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1400;
    const startTime = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return value;
}

function StatItem({ label, target, start }) {
  const value = useCountUp(target, start);
  return (
    <div className="stat-item">
      <span className="stat-item__number">{value}</span>
      <span className="stat-item__plus">+</span>
      <p className="stat-item__label">{label}</p>
    </div>
  );
}

function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="chiffres-cles" ref={ref}>
      <div className="stats__bg-strip" aria-hidden="true"></div>

      <div className="stats__container">
        <header className="stats__head">
          <span className="stats__eyebrow">
            <svg viewBox="0 0 24 24" className="stats__eyebrow-icon" aria-hidden="true">
              <path d="M12 2 L14.5 9 H22 L16 13.5 L18 21 L12 16.5 L6 21 L8 13.5 L2 9 H9.5 Z" />
            </svg>
            Nos chiffres clés
          </span>
          <h2 className="stats__title">
            Farjallah Auto vous accompagne avec<br className="stats__title-break" /> qualité, expérience et confiance
          </h2>
        </header>

        <div className="stats__grid">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
