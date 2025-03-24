import "./LandingPage.scss";
import Footer from "../../components/Footer/Footer";
import LandingPageHero from "../../components/LandingPageHero/LandingPageHero";
import WhatSection from "../../components/WhatSection/WhatSection";
import WhySection from "../../components/WhySection/WhySection";

function LandingPage() {
  return (
    <>
      <LandingPageHero />
      <main>
        <WhatSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;
