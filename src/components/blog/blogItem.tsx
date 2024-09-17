import React from "react";
import { Link } from "react-router-dom";

interface BlogItemProps {
  title: string;
  img: string;
  date: string;
  author: string;
}

const BlogItem: React.FC<BlogItemProps> = ({ title, img, date, author }) => {
  return (
    <div className="">
      <Link to="#!">
        <img
          src={img}
          alt={title}
          className="w-full h-[247px] rounded-md object-cover max-sm:h-[187px]"
        />
      </Link>
      <span
        className="font-manrope text-[20px] font-bold text-[#131717] max-sm:text-[14px]"
        style={{ lineHeight: "150%" }}
      >
        {title}
      </span>
      <br />
      <small
        className="font-manrope text-[14px] font-normal text-[#566363] max-sm:text-[10px]"
        style={{ lineHeight: "171.429%" }}
      >
        {date} | By {author}
      </small>
    </div>
  );
};

export default BlogItem;
