import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function Register() {
  const { id } = useParams(); // courseId
  const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await axiosInstance.get(`/api/courses/${id}`);
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/registrations', {
        name,
        email,
        courseId: id,
      });
      alert('Đăng ký thành công!');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      alert('Đăng ký thất bại');
    }
  };

  if (!course) return <p>Đang tải thông tin khóa học...</p>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Đăng ký khóa học: {course.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email của bạn"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded">
          Gửi đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
