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
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom'; 
// import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <>
      <Navbar />  {/* Navbar is inside Router from index.jsx */}
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
      <Toaster />
    </>
  );
}

export default App;
