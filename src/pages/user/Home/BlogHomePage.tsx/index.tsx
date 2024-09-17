import React from "react";
import Slider from "react-slick";
import BlogHomeItem from "./BlogHomeItem";

const BlogHomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mb-[50px] mt-[100px] sm:my-[150px] sm:mt-[150px]">
      <div className="mb-[70px] max-w-[470px]">
        <h2 className="text-[4.2rem] font-bold leading-[123.81%]">
          Learn how to build and grow your online store
        </h2>
        <p className="mt-[18px] text-[1.8rem] leading-[166.667%] text-[#566363]">
          Get insider tips and step-by-step guidance from eCommerce experts and
          successful Wix Merchants.
        </p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <BlogHomeItem
              imgUrl="https://plus.unsplash.com/premium_photo-1683121263622-664434494177?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="How to start an online store"
            />
          </div>
          <div>
            <BlogHomeItem
              imgUrl="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="7 examples of the best eCommerce websites to take notes from"
            />
          </div>
          <div>
            <BlogHomeItem
              imgUrl="https://images.unsplash.com/photo-1601597565151-70c4020dc0e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="How to start a t-shirt business: ultimate step-by-step guide"
            />
          </div>
          <div>
            <BlogHomeItem
              imgUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="How to start a t-shirt business: ultimate step-by-step guide"
            />
          </div>
          <div>
            <BlogHomeItem
              imgUrl="https://images.unsplash.com/photo-1520367745676-56196632073f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="How to start a t-shirt business: ultimate step-by-step guide"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BlogHomePage;
