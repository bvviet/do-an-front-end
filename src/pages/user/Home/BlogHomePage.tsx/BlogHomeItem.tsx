import dropDow from "@/assets/icons/dropDowRight.svg";
import { FC } from "react";

interface BlogHomeItemProps {
    imgUrl: string;
    title: string;
}

const BlogHomeItem: FC<BlogHomeItemProps> = ({ imgUrl, title }) => {
    return (
        <div className="relative h-[404px]">
            <a href="#!">
                <img src={imgUrl} alt="" className="rounded-t-xl h-[227px] w-full object-cover" />
            </a>
            <p className="mt-[25px] text-[#566363] text-[1.8rem]">{title}</p>
            <div className="absolute bottom-[30px] flex items-center gap-[10px] cursor-pointer mt-auto">
                <p className="text-[1.8rem] font-semibold leading-[166.667%] border-solid border-b-[2px] border-black">
                    Read the blog
                </p>
                <img src={dropDow} alt="" className="mt-2" />
            </div>
        </div>
    );
};
export default BlogHomeItem;
