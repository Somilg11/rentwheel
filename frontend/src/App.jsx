import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Navbar uses useNavigate
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import RegisterPage from './pages/UserRegister';
import LoginPage from './pages/UserLogin';
import AdminLoginPage from './pages/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <Router> {/* Ensure Router is here */}
      <Navbar />  {/* Navbar is now inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        {/* <Route path="/admindashboard" element={<AdminDashboard/>} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
