import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">Language Center</Link>
        <nav className="flex gap-6 text-lg">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/about" className="hover:underline">Giới thiệu</Link>
          <Link to="/courses" className="hover:underline">Khóa học</Link>
          <Link to="/teachers" className="hover:underline">Giảng viên</Link>
          <Link to="/admin-login" className="hover:underline">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
