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
            style={{ ...style, display: "block", background: "red", marginLeft: "20px" }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow: React.FC<ArrowProps> = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red", marginRight: "20px" }}
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
                    onClick={() =>
                        openPopup(
                            <img src="https://s3-alpha-sig.figma.com/img/4460/9b9b/93c74dea7c16d7a286628354e79cd4cb?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D5l~D~JT4L0Nvgfj8uxwao8t2nNW9K98ABkx7Suh5UDVsELGw0-bbSKcvaECIXRYuf-G4DsFm3gy8YJmh2wsHZcBap60-Z1OBcOgA8anyfEmAnN20GIu1fVPz6VnexjJZ5QGMRKAoX1UsGNgstodpdnbOrExJ0FE60YHLcQlxTvesRU~26ruHfXkD2PqZlHO~OZSdf9DVsc6Q1FIA3EAevw9Vdy600gmIzIPyx1dsm~nJmd-cPmYi8ezMXsp613UA9o8SpeXKbaPbFapfS1g-80ocXmY-rK2vQZ6ztSdf0LahlGi-nqOSfVb3Q9iWwrJiDLVacpGXpxUEkdsPADdYA__" />
                        )
                    }
                    className="w-[100px] cursor-pointer bg-[#FEFFE9]"
                    onMouseEnter={handleImageClick}
                >
                    <img
                        src="https://s3-alpha-sig.figma.com/img/4460/9b9b/93c74dea7c16d7a286628354e79cd4cb?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D5l~D~JT4L0Nvgfj8uxwao8t2nNW9K98ABkx7Suh5UDVsELGw0-bbSKcvaECIXRYuf-G4DsFm3gy8YJmh2wsHZcBap60-Z1OBcOgA8anyfEmAnN20GIu1fVPz6VnexjJZ5QGMRKAoX1UsGNgstodpdnbOrExJ0FE60YHLcQlxTvesRU~26ruHfXkD2PqZlHO~OZSdf9DVsc6Q1FIA3EAevw9Vdy600gmIzIPyx1dsm~nJmd-cPmYi8ezMXsp613UA9o8SpeXKbaPbFapfS1g-80ocXmY-rK2vQZ6ztSdf0LahlGi-nqOSfVb3Q9iWwrJiDLVacpGXpxUEkdsPADdYA__"
                        alt="Image 1"
                    />
                </div>
                <div
                    onClick={() =>
                        openPopup(
                            <img src="https://s3-alpha-sig.figma.com/img/40a4/40ab/6537ae20c0db98c931556f93cd8194cf?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iDURonW9PwyK9gr-zcxB-gf4j-OWJgZomFeCzcRmWY1~RtbvZqBrOgX7YaEkDQzT84kYM7jN3MPIysIawNW0yus4B6p55s0iFjJC1R00lBH4JBno~PWdpMGgNs-NNRO5ONBJFYgGmfLnHRT52W9-1CEqWkGPS-cOWI2uPEn53FCHGTsnTMCl6fTnjYmKkGsJS~JuJrUMkhB8h--1zLEZbjmeuDh~ciCJz8rVKGq7HVQQPXLP2tysCzHskrBIXoFfd8qssSHZBuF0zqdzHVS8uFCaO7C9onqQQG9CUAuSq-aqxSurO9I6NNZRhqxs46Z2oQ8BmSIIs7FZvAhDSBetjQ__" />
                        )
                    }
                    className="cursor-pointer bg-[#C4D1D0]"
                    onMouseEnter={handleImageClick}
                >
                    <img
                        src="https://s3-alpha-sig.figma.com/img/40a4/40ab/6537ae20c0db98c931556f93cd8194cf?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iDURonW9PwyK9gr-zcxB-gf4j-OWJgZomFeCzcRmWY1~RtbvZqBrOgX7YaEkDQzT84kYM7jN3MPIysIawNW0yus4B6p55s0iFjJC1R00lBH4JBno~PWdpMGgNs-NNRO5ONBJFYgGmfLnHRT52W9-1CEqWkGPS-cOWI2uPEn53FCHGTsnTMCl6fTnjYmKkGsJS~JuJrUMkhB8h--1zLEZbjmeuDh~ciCJz8rVKGq7HVQQPXLP2tysCzHskrBIXoFfd8qssSHZBuF0zqdzHVS8uFCaO7C9onqQQG9CUAuSq-aqxSurO9I6NNZRhqxs46Z2oQ8BmSIIs7FZvAhDSBetjQ__"
                        alt="Image 2"
                    />
                </div>
                <div
                    onClick={() =>
                        openPopup(
                            <img src="https://s3-alpha-sig.figma.com/img/156b/abd9/83e8199e0c6dfeba375403cc5b2b5f7a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SqRAPsM2l1HuPV6v0HcWgIXYLWnizsCi~krvy25kgbub4d4nYxqbITb-0bgk~kquosDFesH8MS2F7oyN4sym9jeIaPZSO3BI793soFn5bJxLtSku9bJeMIZzAD3IAPkeOEulifcPCG7PxoqkzrsDKZPufXO-~LC0~Ai39MydHNc82Vh3ZAb8NTeehGoY-0t4IF7ic0qsUPKHFS~Ucl7yLtRvjzevQqRUvhVez46~j6cLGZ-jfAbx7AiqPudETOh0sUfxwL6gU4K4QUmg80DoCnjtRlsARrIyntOTPoG9sAqdXD1gXV0FwiYJrFGAwpLneXSaB8IQFOElG0mpp1PUpA__" />
                        )
                    }
                    className="cursor-pointer bg-[#F8E9EC]"
                    onMouseEnter={handleImageClick}
                >
                    <img
                        src="https://s3-alpha-sig.figma.com/img/156b/abd9/83e8199e0c6dfeba375403cc5b2b5f7a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SqRAPsM2l1HuPV6v0HcWgIXYLWnizsCi~krvy25kgbub4d4nYxqbITb-0bgk~kquosDFesH8MS2F7oyN4sym9jeIaPZSO3BI793soFn5bJxLtSku9bJeMIZzAD3IAPkeOEulifcPCG7PxoqkzrsDKZPufXO-~LC0~Ai39MydHNc82Vh3ZAb8NTeehGoY-0t4IF7ic0qsUPKHFS~Ucl7yLtRvjzevQqRUvhVez46~j6cLGZ-jfAbx7AiqPudETOh0sUfxwL6gU4K4QUmg80DoCnjtRlsARrIyntOTPoG9sAqdXD1gXV0FwiYJrFGAwpLneXSaB8IQFOElG0mpp1PUpA__"
                        alt="Image 2"
                    />
                </div>
                <div
                    onClick={() =>
                        openPopup(
                            <img src="https://s3-alpha-sig.figma.com/img/44d7/416b/dc35e92eb27a1b6558a2bfbcd78542a6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qICMSqUaVdPR15aqzo7ONe03NqS4sBaQDZFp3H5xma4OIuPYilThwoBzMM-n1VEfco7xPx~eX9qfjyO3ifzXuuOBkT4pvNP8~je-mh0YbhEw0jpovzc6F6~w0QZDIYXAkA0W8hJY2aCjAcAJ6J4z98xjsP7ibgpGPm-xIz1zqv9lIrqdA3IB-FRWys5BJPzFEdsUqggnY5DC6Wd~mETgnBpRteSWKmGiXNk0Ax10twx3m8-05Z3o07vH2Ax2LgS39v9QKZvky2eztwdQRrmkeEnriL7n3X7ZX2dTUF9zkUXN59r5zlhRaACwRmAUlexCfDqcIcSNO1NBkAaxaZ9Ohg__" />
                        )
                    }
                    className="cursor-pointer bg-[#C4D1D0]"
                    onMouseEnter={handleImageClick}
                >
                    <img
                        src="https://s3-alpha-sig.figma.com/img/44d7/416b/dc35e92eb27a1b6558a2bfbcd78542a6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qICMSqUaVdPR15aqzo7ONe03NqS4sBaQDZFp3H5xma4OIuPYilThwoBzMM-n1VEfco7xPx~eX9qfjyO3ifzXuuOBkT4pvNP8~je-mh0YbhEw0jpovzc6F6~w0QZDIYXAkA0W8hJY2aCjAcAJ6J4z98xjsP7ibgpGPm-xIz1zqv9lIrqdA3IB-FRWys5BJPzFEdsUqggnY5DC6Wd~mETgnBpRteSWKmGiXNk0Ax10twx3m8-05Z3o07vH2Ax2LgS39v9QKZvky2eztwdQRrmkeEnriL7n3X7ZX2dTUF9zkUXN59r5zlhRaACwRmAUlexCfDqcIcSNO1NBkAaxaZ9Ohg__"
                        alt="Image 2"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;
