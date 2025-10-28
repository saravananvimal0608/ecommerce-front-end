import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import { renderStars } from '../common/common.js'
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
                            <img src={`${BASE_URL}/upload/${item.image}`} alt={item.name} width="100" height="90" />
                            <p className="mt-1 mb-1"><b>Product : </b>{item.name}</p>
                            <p className=" mb-1"><b>price : </b><span className="red-color">${item.price}</span></p>
                            <p><b>Rating : </b> <span className="red-color">{renderStars(4)}</span></p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
export default SwiperComponent