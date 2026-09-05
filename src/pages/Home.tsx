import PageTransition from '../components/common/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import HomeServices from '../components/sections/HomeServices';
import HomeIndustries from '../components/sections/HomeIndustries';
import HomeClients from '../components/sections/HomeClients';
import HomeCTA from '../components/sections/HomeCTA';

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <HomeServices />
      <HomeIndustries />
      <HomeClients />
      <HomeCTA />
    </PageTransition>
  );
}
