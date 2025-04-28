import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Register from './pages/Register';
import Teachers from './pages/Teachers';
import AdminDashboard from './pages/AdminDashboard';
import LoginAdmin from './pages/LoginAdmin';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminInfo');
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/admin-login" element={<LoginAdmin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
