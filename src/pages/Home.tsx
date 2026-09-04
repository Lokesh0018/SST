import PageTransition from '../components/common/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import HomeSolutions from '../components/sections/HomeSolutions';
import HomeIndustries from '../components/sections/HomeIndustries';
import HomeProjects from '../components/sections/HomeProjects';
import HomeCTA from '../components/sections/HomeCTA';

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <HomeSolutions />
      <HomeIndustries />
      <HomeProjects />
      <HomeCTA />
    </PageTransition>
  );
}
