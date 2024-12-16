import Slider from "react-slick";

function SliceShow() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliceArray = [
    {
      id: 1,
      src: "../src/assets/banner/banner1.png",
    },
    {
      id: 2,
      src: "../src/assets/banner/banner2.png",
    },
    {
      id: 3,
      src: "../src/assets/banner/banner3.png",
    },
    {
      id: 4,
      src: "../src/assets/banner/banner4.png",
    },
    {
      id: 5,
      src: "../src/assets/banner/banner5.png",
    },
  ];
  return (
    <div className="slider-container ml-auto mr-auto">
      <style>
        {`
          .slick-prev, .slick-next {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            transition: background-color 0.3s ease;
          }

          .slick-prev:hover, .slick-next:hover {
            background-color: rgba(0, 0, 0, 0.8);
          }

          .slick-prev {
            left: 10px;
          }

          .slick-next {
            right: 10px;
          }
        `}
      </style>
      <Slider {...settings}>
        {sliceArray.map((item) => (
          <div
            className="relative h-[180px] cursor-pointer sm:h-[630px]"
            key={item.id}
          >
            <img className="h-full w-full" src={item.src} alt="" />
            <div className="z-2 absolute top-0 flex object-cover"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliceShow;
