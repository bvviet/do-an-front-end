import React from 'react';

interface BlogItemProps {
    title: string;
    img: string;
    date: string;
    author: string;
}

const BlogItem: React.FC<BlogItemProps> = ({ title, img, date, author }) => {
    return (
        <div className="">
            <img src={img} alt={title} className="h-[247px] max-sm:h-[187px] object-cover" />
            <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>{title}</span><br />
            <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>{date} | By {author}</small>
        </div>
    );
};

export default BlogItem;
