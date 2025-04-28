import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BannerSlider = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
      <div>
        <img src="/images/banner1.jpg" alt="Banner 1" className="h-96 object-cover w-full" />
      </div>
      <div>
        <img src="/images/banner2.jpg" alt="Banner 2" className="h-96 object-cover w-full" />
      </div>
      <div>
        <img src="/images/banner3.jpg" alt="Banner 3" className="h-96 object-cover w-full" />
      </div>
    </Carousel>
  );
};

export default BannerSlider;
