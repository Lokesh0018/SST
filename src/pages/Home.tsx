import PageTransition from '../components/common/PageTransition';
import ServiceMapHero from '../components/hero/ServiceMapHero';
import HomeServices from '../components/sections/HomeServices';
import HomeIndustries from '../components/sections/HomeIndustries';
import HomeClients from '../components/sections/HomeClients';
import HomeAbout from '../components/sections/HomeAbout';
import { ServiceProvider } from '../context/ServiceContext';

export default function Home() {
  return (
    <PageTransition>
      <ServiceProvider>
        <ServiceMapHero />
        <HomeServices />
      </ServiceProvider>
      <HomeIndustries />
      <HomeClients />
      <HomeAbout />
    </PageTransition>
  );
}
