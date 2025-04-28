import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data } = await axiosInstance.get('/api/teachers');
      setTeachers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Banner */}
      <div className="relative h-80">
        <img
          src="/images/teachers-banner.jpg"
          alt="Our Teachers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-15 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold"></h1>
        </div>
      </div>

      {/* Danh sách giảng viên */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Giảng viên ưu tú của chúng tôi</h2>

        {teachers.length === 0 ? (
          <p className="text-center text-lg">Đang tải danh sách giảng viên...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                <img
                  src={teacher.image || '/images/default-teacher.jpg'}
                  alt={teacher.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                  <p className="text-gray-600 text-sm">{teacher.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Teachers;
