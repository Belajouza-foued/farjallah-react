import "./css/MapSection.css";

function MapSection() {
  return (
    <section className="map-section">
      <div className="container">
        <h2>Notre Localisation</h2>

        <div className="map-frame">
          <iframe
            src="https://www.google.com/maps?q=Route+Tunis+4011+Hammam+Sousse+Tunisie&output=embed"
            title="Localisation Farjallah Auto"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
