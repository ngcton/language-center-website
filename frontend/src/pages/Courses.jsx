import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get('/api/courses');
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Banner */}
      <div className="relative h-80">
        <img
          src="/images/courses-banner.jpg"
          alt="Our Courses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-15 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold"></h1>
        </div>
      </div>

      {/* Danh sách khóa học */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Khám phá khóa học dành cho bạn</h2>

        {courses.length === 0 ? (
          <p className="text-center text-lg">Đang tải danh sách khóa học...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <img
                  src={course.image || '/images/default-course.jpg'}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Giảng viên: {course.teacher}
                  </p>
                  {/* Thêm mô tả khoá học */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {course.description || "Không có mô tả."}
        </p>
                  <p className="text-gray-500 text-sm mb-6">
                    {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                  </p>
                   
                  <Link
                    to={`/course/${course._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Courses;
