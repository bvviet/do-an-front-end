import Slider from "react-slick";

function SliceShow() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliceArray = [
    {
      id: 1,
      src: "https://plus.unsplash.com/premium_photo-1668133957823-456f1c87b58c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      src: "https://plus.unsplash.com/premium_photo-1673502752899-04caa9541a5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      src: "https://plus.unsplash.com/premium_photo-1673502751768-586478eb3fcb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      src: "https://plus.unsplash.com/premium_photo-1670152411569-7cbc00946857?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1542992015-4a0b729b1385?q=80&w=1789&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            className="relative h-[180px] cursor-pointer sm:h-[530px]"
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
