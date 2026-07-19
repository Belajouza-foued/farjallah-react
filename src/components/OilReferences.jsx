import "./css/OilReferences.css";

const OIL_BRANDS = [
  { name: "Elf", src: "/assets/images/elf.png" },
  { name: "Shell", src: "/assets/images/shell.png" },
  { name: "Castrol", src: "/assets/images/gastrol.png" },
  { name: "Mannol", src: "/assets/images/mannol.png" },
  { name: "Total", src: "/assets/images/total-1.jpg" },
  { name: "Motul", src: "/assets/images/motul.png" },
];

function OilReferences() {
  return (
    <>
      <section className="ref-hero text-center">
        <h2>Huiles &amp; références</h2>
      </section>

      <section className="oil-refs">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {OIL_BRANDS.map((brand) => (
              <div key={brand.name} className="col-6 col-md-3 col-lg-2">
                <div className="logo-card">
                  <img src={brand.src} alt={brand.name} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default OilReferences;
