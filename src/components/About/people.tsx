import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
export default function People() {
  const items = [
    {
      img: "https://blog.coccoc.com/tong-hop-meme-meo/meme-meo-cute-5/",
      name: "Vũ Tiến Việt",
      vitri: "Developer web",
    },
    {
      img: "https://cdn.vinaenter.edu.vn/wp-content/uploads/2024/07/anh-meo-buon-co-don-1.jpg",
      name: "Bàn Văn Việt",
      vitri: "Developer web",
    },
    {
      img: "data:image/jpeg;base64,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",
      name: "Vũ Thuận",
      vitri: "Developer web",
    },
    {
      img: "https://cdn2.fptshop.com.vn/unsafe/800x0/meme_meo_khoc_2_e580623a0a.jpg",
      name: "Duy Lập",
      vitri: "Developer web",
    },
    {
      img: "https://blog.coccoc.com/tong-hop-meme-meo/meme-meo-cute-5/",
      name: "TienViet",
      vitri: "Developer web",
    },
    {
      img: "https://blog.coccoc.com/tong-hop-meme-meo/meme-meo-cute-5/",
      name: "TienViet",
      vitri: "Developer web",
    },
  ];
  return (
    <>
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
        {items.map((item) => (
          <SwiperSlide className="mb-12">
            <div className="flex flex-col items-center">
              <img
                className="inline-block size-[246px] max-md:size-[64px] max-xl:size-[124px] rounded-full"
                src={item.img}
                alt="Avatar"
              />
              <p
                className="text-center text-[16px] max-lg:text-[12px] font-manrope font-medium"
                style={{ lineHeight: "175%" }}
              >
                {item.name}
              </p>
              <p className="text-center text-[12px] max-lg:text-[8px] text-[#889595] font-manrope font-normal">
                {item.vitri}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
