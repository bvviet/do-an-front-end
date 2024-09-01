import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { Scrollbar } from 'swiper/modules';
import './relate.css';

export default function RelatedBlog() {
    return (
        <Swiper
            spaceBetween={32} // gap-8
            scrollbar={{
                hide: false, // Show the scrollbar
            }}
            modules={[Scrollbar]}
            className="mySwiper"
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 16, // gap-4
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24, // gap-6
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32, // gap-8
                },
            }}
        >
            <SwiperSlide className='mb-12'>
                <div>
                    <img className="h-[247px] max-sm:h-[187px] object-cover" src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg" alt="" />
                    <h3 className="text-[20px] font-manrope font-bold max-md:text-[16px]" style={{ lineHeight: "150%" }}>Win a Samsung Portable SSD T7 Shield</h3>
                    <p className="text-[14px] text-[#566363] font-normal font-manrope max-md:text-[12px]" style={{ lineHeight: "171.429%" }}>With over 11k contributions, the Travel Topic on Unsplash gets a lot of traffic. It allows for Unsplash users to discover hidden wonders and inspiring destinations around the world from the comfort of their own homes.</p>
                    <Link to={"#!"} className="text-[#005D63] font-manrope font-semibold text-[16px] max-md:text-[14px]">Read more</Link>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div>
                    <img className="h-[247px] max-sm:h-[187px] object-cover" src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg" alt="" />
                    <h3 className="text-[20px] font-manrope font-bold max-md:text-[16px]" style={{ lineHeight: "150%" }}>Win a Samsung Portable SSD T7 Shield</h3>
                    <p className="text-[14px] text-[#566363] font-normal font-manrope max-md:text-[12px]" style={{ lineHeight: "171.429%" }}>With over 11k contributions, the Travel Topic on Unsplash gets a lot of traffic. It allows for Unsplash users to discover hidden wonders and inspiring destinations around the world from the comfort of their own homes.</p>
                    <Link to={"#!"} className="text-[#005D63] font-manrope font-semibold text-[16px] max-md:text-[14px]">Read more</Link>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <img className="h-[247px] max-sm:h-[187px] object-cover" src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg" alt="" />
                    <h3 className="text-[20px] font-manrope font-bold max-md:text-[16px]" style={{ lineHeight: "150%" }}>Win a Samsung Portable SSD T7 Shield</h3>
                    <p className="text-[14px] text-[#566363] font-normal font-manrope max-md:text-[12px]" style={{ lineHeight: "171.429%" }}>With over 11k contributions, the Travel Topic on Unsplash gets a lot of traffic. It allows for Unsplash users to discover hidden wonders and inspiring destinations around the world from the comfort of their own homes.</p>
                    <Link to={"#!"} className="text-[#005D63] font-manrope font-semibold text-[16px] max-md:text-[14px]">Read more</Link>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
