import Hero from '../components/Hero';
import CarCatalogue from '../components/Carcatalogue';
import MapSection from '../components/Mapsection';
import Newsletter from '../components/Newsletter';
import TestimonialSection from '../components/Testimonial';
import Navbar from '@/components/Navbar';  // Navbar uses useNavigate
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
    <Navbar />
      <Hero />
      <CarCatalogue />
      <MapSection />
      <TestimonialSection />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
