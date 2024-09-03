import { useState } from "react";
import BlogItem from "./blogItem";

export default function BlogCompoment() {
    const [visibleCount, setVisibleCount] = useState(6); // Số lượng item hiển thị ban đầu

    // Mẫu item mặc định
    const defaultItem = {
        title: "Kỉ niệm ngày 2/9",
        img: "https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg",
        date: "Sep 9, 2024",
        author: "TienViet",
    };

    // Mảng chỉ số
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    // Tạo mảng items từ mẫu và chỉ số
    const array = indices.map((index) => ({
        id: index,
        ...defaultItem,
    }));

    const arr = array.slice(0, visibleCount); // Lấy các item hiển thị dựa vào số lượng hiển thị

    const showHide = visibleCount < array.length; // Kiểm tra xem còn item nào để hiển thị không

    const handleShowMore = () => {
        if (showHide) {
            setVisibleCount((prevCount) => prevCount + 6); // Hiển thị thêm 6 item
        } else {
            setVisibleCount(6); // Nếu đã hiển thị hết thì reset lại về 3 item
        }
    };

    return (
        <div className="">
            <h1
                className="font-slab font-bold text-[42px] max-sm:text-[28px] text-[#131717] py-32  hover:underline"
                style={{ lineHeight: "123.81%" }}
            >
                Latest from the team
            </h1>
            <div className="grid grid-cols-3 gap-12 max-sm:gap-6 max-sm:grid-cols-2 mx-auto">
                {arr.map((item) => (
                    <BlogItem key={item.id} title={item.title} img={item.img} date={item.date} author={item.author} />
                ))}
            </div>
            <div className="w-full flex justify-center mt-[80px] max-lg:mt-[52px]">
                <button
                    type="button"
                    onClick={handleShowMore}
                    className="flex justify-center text-white bg-[#005D63] hover:bg-[#274b4f] rounded text-[18px] max-md:text-[14px] font-semibold px-[32px] py-4 mb-2"
                    style={{ lineHeight: "166.67%" }}
                >
                    {showHide ? "Load more" : "Hide all"}
                </button>
            </div>
        </div>
    );
}
