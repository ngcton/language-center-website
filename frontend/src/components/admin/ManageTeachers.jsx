import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const { data } = await axiosInstance.get('/api/teachers');
    setTeachers(data);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axiosInstance.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImage(data.imageUrl);
    } catch (error) {
      console.error(error);
      alert('Upload ảnh thất bại!');
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axiosInstance.put(`/api/teachers/${editingId}`, {
          name,
          bio,
          image,
        });
        alert('Đã cập nhật giảng viên!');
      } else {
        await axiosInstance.post('/api/teachers', {
          name,
          bio,
          image,
        });
        alert('Đã thêm giảng viên mới!');
      }

      fetchTeachers();
      clearForm();
    } catch (err) {
      console.error(err);
      alert('Lỗi khi lưu giảng viên');
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setName(teacher.name);
    setBio(teacher.bio);
    setImage(teacher.image);
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa giảng viên này?')) {
      await axiosInstance.delete(`/api/teachers/${id}`);
      fetchTeachers();
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setName('');
    setBio('');
    setImage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? 'Chỉnh sửa Giảng viên' : 'Thêm Giảng viên mới'}
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-10">
        <input type="text" placeholder="Tên giảng viên" className="border p-2" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Tiểu sử" className="border p-2" value={bio} onChange={(e) => setBio(e.target.value)} />

        <input type="file" accept="image/*" onChange={uploadFileHandler} />
        {image && <img src={image} alt="preview" className="w-48 h-32 object-cover mt-2" />}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 rounded"
        >
          {editingId ? 'Cập nhật Giảng viên' : 'Thêm Giảng viên'}
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

      <h2 className="text-2xl font-bold mb-4">Danh sách Giảng viên</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="border rounded p-4 shadow">
            <img src={teacher.image || '/images/default-teacher.jpg'} alt={teacher.name} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold">{teacher.name}</h3>
            <p className="text-sm text-gray-600">{teacher.bio}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(teacher)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleDeleteTeacher(teacher._id)}
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

export default ManageTeachers;
