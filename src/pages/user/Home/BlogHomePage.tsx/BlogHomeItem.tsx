import dropDow from "@/assets/icons/dropDowRight.svg";
import { FC } from "react";
import { Link } from "react-router-dom";

interface BlogHomeItemProps {
  imgUrl: string;
  title: string;
}

const BlogHomeItem: FC<BlogHomeItemProps> = ({ imgUrl, title }) => {
  return (
    <div className="relative h-[404px]">
      <div className="transform overflow-hidden rounded-t-xl transition-all duration-300 ease-in-out hover:scale-105">
        <img
          src={imgUrl}
          alt=""
          className="h-[227px] w-[90%] rounded-t-xl object-cover"
        />
      </div>

      <Link to="/blogDetail">
        <p className="mt-[25px] text-[1.8rem] text-[#566363]">{title}</p>
      </Link>
      <div className="absolute bottom-[30px] mt-auto flex cursor-pointer items-center gap-[10px] hover:opacity-55">
        <Link
          to={"/blogDetail"}
          className="text-[1.8rem] font-semibold leading-[166.667%]"
        >
          Read the blog
        </Link>
        <img src={dropDow} alt="" className="mt-2" />
      </div>
    </div>
  );
};
export default BlogHomeItem;
