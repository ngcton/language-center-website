import { useState } from 'react';
import ManageCourses from '../components/admin/ManageCourses';
import ManageTeachers from '../components/admin/ManageTeachers';
import ManageRegistrations from '../components/admin/ManageRegistrations';

function AdminDashboard() {
  const [tab, setTab] = useState('courses');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="flex justify-center gap-6 mb-10">
        <button onClick={() => setTab('courses')} className="px-4 py-2 bg-blue-500 text-white rounded">Quản lý Khóa học</button>
        <button onClick={() => setTab('teachers')} className="px-4 py-2 bg-green-500 text-white rounded">Quản lý Giáo viên</button>
        <button onClick={() => setTab('registrations')} className="px-4 py-2 bg-purple-500 text-white rounded">Quản lý Đăng ký</button>
      </div>

      {tab === 'courses' && <ManageCourses />}
      {tab === 'teachers' && <ManageTeachers />}
      {tab === 'registrations' && <ManageRegistrations />}
    </div>
  );
}

export default AdminDashboard;
