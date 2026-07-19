import Hero from "../components/Hero";
import Sectors from "../components/Sectors";
import Brands from "../components/Brands";
import OilReferences from "../components/OilReferences";
import About from "../components/About";
import Services from "../components/Services";
import Stats from "../components/Stats";
import PaintSection from "../components/PaintSection";
import StockInfo from "../components/StockInfo";
import WhatsappButton from "../components/WhatsappButton";
import "../styles/theme.css"

function Home() {
  return (
    <>
      <Hero />
      <Sectors />
      <Brands />
      <OilReferences />
      <About />
      <Services />
      <Stats />
      <PaintSection />
      <StockInfo />
      <WhatsappButton />
    </>
  );
}

export default Home;
