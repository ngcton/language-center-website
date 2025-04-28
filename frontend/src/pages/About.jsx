import React from 'react';

function About() {
  const campuses = [
    {
      name: "Cơ sở Quận 1",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      image: "/images/campus1.jpg",
    },
    {
      name: "Cơ sở Quận 7",
      address: "456 Nguyễn Văn Linh, Quận 7, TP.HCM",
      image: "/images/campus2.jpg",
    },
    {
      name: "Cơ sở Hà Nội",
      address: "789 Kim Mã, Ba Đình, Hà Nội",
      image: "/images/campus3.jpg",
    },
  ];

  const achievements = [
    "Top 5 Trung tâm ngoại ngữ uy tín tại Việt Nam (2022)",
    "Giải thưởng Dạy tiếng Anh xuất sắc do Bộ Giáo dục trao tặng",
    "Hơn 10,000 học viên đạt IELTS 7.0+",
    "Chứng nhận đối tác giáo dục Cambridge",
  ];

  return (
    <div className="text-gray-800">
      {/* Banner */}
      <div className="relative h-96">
        <img
          src="/images/about-banner.jpg"
          alt="Language Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-15 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold"></h1>
        </div>
      </div>

      {/* Tổng quan */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Tầm nhìn & Sứ mệnh</h2>
        <p className="text-lg leading-relaxed text-center">
          Trung tâm Ngoại ngữ Language Center cam kết đem lại môi trường học tập hiện đại, chuyên nghiệp,
          giúp học viên chinh phục ngoại ngữ một cách tự tin và hiệu quả.
          Chúng tôi không chỉ dạy ngôn ngữ, mà còn truyền cảm hứng học tập suốt đời cho học viên.
        </p>
      </section>

      {/* Các cơ sở */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Hệ thống Cơ sở (Campus)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campuses.map((campus, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={campus.image} alt={campus.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{campus.name}</h3>
                  <p className="text-gray-600">{campus.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lịch sử hình thành */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Lịch sử hình thành & phát triển</h2>
          <div className="relative border-l-4 border-blue-500 pl-6 space-y-8">
            <div>
              <span className="text-blue-500 font-bold">2010</span>
              <p className="ml-4">Thành lập Trung tâm Ngoại ngữ Language Center tại TP.HCM.</p>
            </div>
            <div>
              <span className="text-blue-500 font-bold">2015</span>
              <p className="ml-4">Mở rộng chi nhánh tại Hà Nội và Đà Nẵng.</p>
            </div>
            <div>
              <span className="text-blue-500 font-bold">2020</span>
              <p className="ml-4">Đạt mốc 10,000 học viên thành công.</p>
            </div>
            <div>
              <span className="text-blue-500 font-bold">2022</span>
              <p className="ml-4">Nhận giải thưởng Trung tâm Ngoại ngữ xuất sắc nhất.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thành tích */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Thành tích & Giải thưởng</h2>
          <ul className="space-y-4 list-disc list-inside">
            {achievements.map((item, index) => (
              <li key={index} className="text-lg">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;
