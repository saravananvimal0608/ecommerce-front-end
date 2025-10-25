import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
const SwiperComponent = ({ product }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            autoplay={{ delay: 3000 }}
            loop={true}
            breakpoints={{
                0: { slidesPerView: 1 },
                426: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
        >
            {product?.map((item, index) => (
                <SwiperSlide key={index}>
                    <Link to={`/product/${item._id}`} className="text-decoration-none text-black">
                        <div className="product-card">
                            <img src={`${BASE_URL}/upload/${item.image}`} alt={item.name} width="100" height="100" />
                            <h5>{item.name}</h5>
                            <p className="fw-bold red-color">${item.price}</p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
export default SwiperComponent