import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Locations from './pages/Locations';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/booking' element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
