import { Link } from 'react-router-dom';
import { getImageUrl } from '../constants';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
      <img
        src={getImageUrl(course.image) || '/images/default-course.jpg'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Giảng viên: {course.teacher}</p>

        {/* Thêm mô tả khoá học */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">
          {course.description || "Không có mô tả."}
        </p>

        <p className="text-gray-400 text-sm mb-6">
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
  );
}

export default CourseCard;
