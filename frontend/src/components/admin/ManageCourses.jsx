import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { getImageUrl } from '../../constants';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teacher, setTeacher] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await axiosInstance.get('/api/courses');
    setCourses(data);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axiosInstance.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(getImageUrl(data.imageUrl));
    } catch (error) {
      console.error(error);
      alert('Upload ảnh thất bại!');
    }
  };

  const handleSubmit = async () => {
    try {
      const courseData = {
        title,
        description,
        teacher,
        startDate,
        endDate,
        image,
      };

      if (editingId) {
        await axiosInstance.put(`/api/courses/${editingId}`, courseData);
        alert('Cập nhật khóa học thành công!');
      } else {
        await axiosInstance.post('/api/courses', courseData);
        alert('Thêm khóa học mới thành công!');
      }

      fetchCourses();
      clearForm();
    } catch (error) {
      console.error(error);
      alert('Lỗi khi lưu khóa học');
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setTitle(course.title);
    setDescription(course.description);
    setTeacher(course.teacher);
    setStartDate(course.startDate?.substring(0, 10));
    setEndDate(course.endDate?.substring(0, 10));
    setImage(getImageUrl(course.image));
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      await axiosInstance.delete(`/api/courses/${id}`);
      fetchCourses();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setTeacher('');
    setStartDate('');
    setEndDate('');
    setImage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? 'Chỉnh sửa Khóa học' : 'Thêm Khóa học mới'}
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-10">
        <input
          type="text"
          placeholder="Tên khóa học"
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Mô tả khóa học"
          className="border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <input
          type="text"
          placeholder="Tên giảng viên"
          className="border p-2"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={uploadFileHandler}
        />
        {image && (
          <img src={image} alt="preview" className="w-48 h-32 object-cover mt-2" />
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded"
        >
          {editingId ? 'Cập nhật Khóa học' : 'Thêm Khóa học'}
        </button>

        {editingId && (
          <button
            onClick={clearForm}
            className="bg-gray-500 text-white py-2 rounded"
          >
            Hủy chỉnh sửa
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Danh sách Khóa học</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img
              src={getImageUrl(course.image) || '/images/default-course.jpg'}
              alt={course.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-gray-600">{course.teacher}</p>
            <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-3">
              {course.description}
            </p>
            <p className="text-gray-400 text-sm">
              {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(course)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCourses;
