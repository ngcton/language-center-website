import BannerSlider from '../components/BannerSlider';
import CourseCard from '../components/CourseCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="relative h-96">
      <BannerSlider />
        <div className="absolute inset-0 bg-black bg-opacity-15 flex items-center justify-center"> 
        </div>
      </div>
      <section className="py-12 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Các Khóa học Nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="text-center col-span-3">Chưa có khóa học nào</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
