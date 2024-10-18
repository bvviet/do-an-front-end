/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import { CSSProperties } from "react";
import { useModalContext } from "../../../contexts/ModelPopUp/ModelProvider";

interface ArrowProps {
  className: string;
  style: CSSProperties;
  onClick?: () => void;
}

const SampleNextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "#ccc",
        marginLeft: "20px",
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        color: "#ccc",
        marginRight: "20px",
      }}
      onClick={onClick}
    />
  );
};

interface CarouselProps {
  SetImage: (imageUrl: string) => void;
  imgs: any;
}

const Carousel: React.FC<CarouselProps> = ({ SetImage, imgs }) => {
  const { openPopup } = useModalContext();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow className="slick-next" style={{}} />,
    prevArrow: <SamplePrevArrow className="slick-prev" style={{}} />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const imgChild = imgs?.slice(0, 5)??[];

  console.log({ imgChild });
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const imgElement = e.currentTarget.querySelector("img");
    if (imgElement) {
      SetImage(imgElement.src);
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* Example images */}
        <div
          onClick={() => openPopup(<img src={imgChild[0]?.image} />)}
          className="h-[100px] w-[100px] cursor-pointer"
          onMouseEnter={handleImageClick}
        >
          <img
            src={imgChild[0]?.image}
            className="h-full w-[90%] object-cover"
            alt="Image 1"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={imgChild[1]?.image} />)}
          className="h-[100px] w-[100px] cursor-pointer"
          onMouseEnter={handleImageClick}
        >
          <img
            src={imgChild[1]?.image}
            className="h-full w-[90%] object-cover"
            alt="Image 2"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={imgChild[2]?.image} />)}
          className="h-[100px] w-[100px] cursor-pointer"
          onMouseEnter={handleImageClick}
        >
          <img
            src={imgChild[2]?.image}
            className="h-full w-[90%] object-cover"
            alt="Image 2"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={imgChild[3]?.image} />)}
          className="h-[100px] w-[100px] cursor-pointer"
          onMouseEnter={handleImageClick}
        >
          <img
            src={imgChild[3]?.image}
            className="h-full w-[90%] object-cover"
            alt="Image 2"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={imgChild[4]?.image} />)}
          className="h-[100px] w-[100px] cursor-pointer"
          onMouseEnter={handleImageClick}
        >
          <img
            src={imgChild[4]?.image}
            className="h-full w-[90%] object-cover"
            alt="Image 2"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
