import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function ManageRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data } = await axiosInstance.get('/api/registrations');
    setRegistrations(data);
  };

  const handleDeleteRegistration = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đăng ký này?')) {
      try {
        await axiosInstance.delete(`/api/registrations/${id}`);
        fetchRegistrations();
        alert('Đã xóa đăng ký thành công!');
      } catch (error) {
        console.error(error);
        alert('Lỗi khi xóa đăng ký');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Danh sách Đăng ký khóa học</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">Tên Học viên</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Tên Khóa học</th>
              <th className="text-left py-3 px-4">Ngày đăng ký</th>
              <th className="text-left py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{reg.name}</td>
                <td className="py-3 px-4">{reg.email}</td>
                <td className="py-3 px-4">{reg.courseId?.title}</td>
                <td className="py-3 px-4">{new Date(reg.registrationDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteRegistration(reg._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageRegistrations;
