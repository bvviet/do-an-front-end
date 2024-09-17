import Slider from "react-slick";
import { CSSProperties } from "react";
import { useModalContext } from "../../../contexts/ModelPopUp/ModelProvider";
import ao2 from "../../../../public/images/ao2.png";

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
        display: "block",
        background: "red",
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
        display: "block",
        background: "red",
        marginRight: "20px",
      }}
      onClick={onClick}
    />
  );
};

interface CarouselProps {
  SetImage: (imageUrl: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ SetImage }) => {
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
          onClick={() => openPopup(<img src={ao2} />)}
          className="h-[100px] w-[100px] cursor-pointer bg-[#FEFFE9]"
          onMouseEnter={handleImageClick}
        >
          <img
            src={ao2}
            className="h-full w-full object-contain"
            alt="Image 1"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={ao2} />)}
          className="h-[100px] w-[100px] cursor-pointer bg-[#C4D1D0]"
          onMouseEnter={handleImageClick}
        >
          <img
            src={ao2}
            className="h-full w-full object-contain"
            alt="Image 2"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={ao2} />)}
          className="h-[100px] w-[100px] cursor-pointer bg-[#F8E9EC]"
          onMouseEnter={handleImageClick}
        >
          <img
            src={ao2}
            className="h-full w-full object-contain"
            alt="Image 2"
          />
        </div>
        <div
          onClick={() => openPopup(<img src={ao2} />)}
          className="h-[100px] w-[100px] cursor-pointer bg-[#ede6b4]"
          onMouseEnter={handleImageClick}
        >
          <img
            src={ao2}
            className="h-full w-full object-contain"
            alt="Image 2"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
