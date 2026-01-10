import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import { renderStars } from '../common/common.js'
import defaultimg from '../assets/defaultimg.png'

const SwiperComponent = ({ product }) => {

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            autoplay={{ delay: 3000 }}
            loop={product.length > 4}
            breakpoints={{
                0: { slidesPerView: 1 },
                426: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
        >
            {product?.map((item) => (
                <SwiperSlide key={item._id}>
                    <Link to={`/product/${item._id}`} className="text-decoration-none text-black">
                        <div className="product-card">
                            <img src={item.image ? `${item?.image ? item.image : defaultimg}` : defaultimg} alt={item.name} width="100" height="90" />
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