
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
export default function People() {
    return <>
        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
            breakpoints={{
                120: {
                    slidesPerView: 3,
                    spaceBetween: 10, // gap-4
                },
                420: {
                    slidesPerView: 4,
                    spaceBetween: 16, // gap-4
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 16, // gap-4
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 24, // gap-6
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 32, // gap-8
                },
            }}
        >
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
            <SwiperSlide className='mb-12'>
                <div className="flex flex-col items-center">
                    <img
                        className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Avatar"
                    />
                    <p className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium" style={{ lineHeight: "175%" }}>
                        Ken Willemson
                    </p>
                    <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                        Managing Director
                    </p>
                </div>
            </SwiperSlide>
           
        </Swiper>
    </>
}