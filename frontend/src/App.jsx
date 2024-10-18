import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';

function App() {
  return (
   <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/booking' element={<BookingPage />} />
        
      </Routes>
      <Footer />
    
    </BrowserRouter>
  );
}

export default App;
