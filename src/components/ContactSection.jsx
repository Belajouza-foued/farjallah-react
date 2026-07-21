import { useState } from "react";
import carImage from "../assets/images/car-2.jpg";
import api from "../api/axios";
import "./css/ContactSection.css";

const SUBJECTS = [
  "Commande et livraison",
  "Pièce introuvable",
  "Conseil technique",
  "Retour et réclamation",
  "Partenariat",
  "Autre",
];

const INITIAL_FORM = {
  prenom: "",
  nom: "",
  email: "",
  tel: "",
  sujet: "",
  message: "",
};

function validate(form) {
  const errors = {};
  if (!form.prenom.trim()) errors.prenom = "Le prénom est requis.";
  if (!form.nom.trim()) errors.nom = "Le nom est requis.";
  if (!form.email.trim()) {
    errors.email = "L'email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format d'email invalide.";
  }
  if (!form.sujet) errors.sujet = "Choisissez un sujet.";
  if (!form.message.trim()) errors.message = "Le message est requis.";
  return errors;
}

function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validate(form);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  try {

    setSending(true);

    const res = await api.post("/contact", {
      firstName: form.prenom,
      lastName: form.nom,
      email: form.email,
      phone: form.tel,
      subject: form.sujet,
      message: form.message,
    });

    setSent(true);

    setForm(INITIAL_FORM);

    console.log("CONTACT SUCCESS:", res.data);

  } catch (err) {

    console.log(
      "CONTACT ERROR:",
      err.response?.data || err.message
    );

    alert(
      err.response?.data?.message ||
      "Erreur lors de l'envoi du message"
    );

  } finally {

    setSending(false);

  }
};

  return (
    <>
      <div className="page-hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="container position-relative text-center">
          <div className="hero-eyebrow">Nous joindre</div>
          <h1>Contactez <em>Nous</em></h1>
          <p>Notre équipe répond sous 2h du lundi au samedi.</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="row g-5 align-items-stretch">

            <div className="col-lg-6">
              <div className="contact-form-box h-100">
                <div className="form-header">
                  <span className="form-tag">Formulaire</span>
                  <h2>Envoyez-nous<br />un <em>message</em></h2>
                  <p>Tous les champs marqués * sont obligatoires.</p>
                </div>

                {sent ? (
                  <div className="send-success show">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" width="48" height="48">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <strong>Message envoyé !</strong>
                    <span>Nous vous répondrons sous 2h.</span>
                    <button type="button" className="send-success__reset" onClick={() => setSent(false)}>
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="f-group">
                          <label htmlFor="cPrenom">Prénom *</label>
                          <input
                            type="text"
                            id="cPrenom"
                            placeholder="Votre prénom"
                            className={errors.prenom ? "invalid" : ""}
                            value={form.prenom}
                            onChange={handleChange("prenom")}
                          />
                          <span className="f-error">{errors.prenom}</span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="f-group">
                          <label htmlFor="cNom">Nom *</label>
                          <input
                            type="text"
                            id="cNom"
                    placeholder="Votre nom"
                            className={errors.nom ? "invalid" : ""}
                            value={form.nom}
    onChange={handleChange("nom")}
                          />
                          <span className="f-error">{errors.nom}</span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="f-group">
                          <label htmlFor="cEmail">Email *</label>
                          <input
                            type="email"
                            id="cEmail"
                            placeholder="email@exemple.com"
                            className={errors.email ? "invalid" : ""}
                            value={form.email}
                            onChange={handleChange("email")}
                          />
                          <span className="f-error">{errors.email}</span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="f-group">
                          <label htmlFor="cTel">Téléphone</label>
                          <input
                            type="tel"
                            id="cTel"
                            placeholder="+216 XX XXX XXX"
                            value={form.tel}
                            onChange={handleChange("tel")}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="f-group">
                          <label htmlFor="cSujet">Sujet *</label>
                          <select
                            id="cSujet"
                            className={errors.sujet ? "invalid" : ""}
                            value={form.sujet}
                            onChange={handleChange("sujet")}
                          >
                            <option value="">-- Choisir un sujet --</option>
                            {SUBJECTS.map((subject) => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                          <span className="f-error">{errors.sujet}</span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="f-group">
                          <label htmlFor="cMessage">Message *</label>
                          <textarea
                            id="cMessage"
                            rows="5"
                            placeholder="Décrivez votre demande..."
                            className={errors.message ? "invalid" : ""}
                            value={form.message}
                            onChange={handleChange("message")}
                          ></textarea>
                          <span className="f-error">{errors.message}</span>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className={`btn-send ${sending ? "loading" : ""}`} disabled={sending}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          {sending ? "Envoi en cours..." : "Envoyer le message"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-right h-100">

                <div className="contact-img-wrap">
    <img 
   src={carImage}
   alt="Farjallah pièces auto"
   className="contact-img"
/>
                  <div className="img-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <path d="M16 8h4l3 3v5h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    Livraison gratuite à Sousse
                  </div>
                </div>

                <div className="horaires-box">
                  <div className="horaires-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    Horaires d'ouverture
                  </div>
                  <div className="h-row"><span>Lundi – Vendredi</span><span className="h-val">08:00 – 18:00</span></div>
                  <div className="h-row"><span>Samedi</span><span className="h-val">09:00 – 14:00</span></div>
                  <div className="h-row closed"><span>Dimanche</span><span className="h-val">Fermé</span></div>
                </div>

                <div className="adresse-box">
                  <div className="adresse-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <strong>Notre adresse</strong>
                    <span>Hammam, Sousse</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default ContactSection;
