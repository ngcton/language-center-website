import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { getImageUrl } from '../constants';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      const { data } = await axiosInstance.get(`/api/courses/${id}`);
      console.log(data)
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <div className="text-center py-10">Đang tải thông tin khóa học...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <img src={getImageUrl(course.image) || '/images/default-course.jpg'} alt={course.title} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
      <p className="text-gray-600 mt-2">Giảng viên: {course.teacher}</p>
      <p className="text-sm mt-2">Khai giảng: {new Date(course.startDate).toLocaleDateString()}</p>
      <div className="mt-6 text-lg leading-relaxed">
        {course.description}
      </div>
      <Link
        to={`/register/${course._id}`}
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded mt-6 hover:bg-blue-600"
      >
        Đăng ký ngay
      </Link>
    </div>
  );
}

export default CourseDetail;