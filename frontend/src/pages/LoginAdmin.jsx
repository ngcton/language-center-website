import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/api/users/login', { email, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/admin');
    } catch (error) {
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập Quản trị</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;