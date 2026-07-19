import "./css/Brands.css";

const BRANDS = [
  { name: "Isuzu", src: "/assets/images/isuzu.webp" },
  { name: "Renault", src: "/assets//images/renault.webp" },
  { name: "Audi", src: "/assets//images/audi.png" },
  { name: "Citroën", src: "/assets//images/citroen.webp" },
  { name: "Kia", src: "/assets//images/kia.webp" },
  { name: "Fiat", src: "/assets//images/fiat.webp" },
  { name: "Peugeot", src: "/assets//images/peugeot.png" },
];

function Brands() {
  // Duplicate the list once so the CSS animation (-50%) loops seamlessly.
  const track = [...BRANDS, ...BRANDS];

  return (
    <section className="brands-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2>Nos Marques</h2>
        </div>

        <div className="brand-slider pt-4">
          <div className="brand-track">
            {track.map((brand, index) => (
              <img key={`${brand.name}-${index}`} src={brand.src} alt={brand.name} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brands;
