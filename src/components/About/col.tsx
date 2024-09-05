import { useState } from "react";

export default function ColumsItem() {
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  // mục mở rộng
  const handleToggle = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle trạng thái của item có id tương ứng
    }));
  };
  return (
    <>
      <div>
        <div
          id="1"
          className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center my-24"
        >
          <div>
            <img
              src="https://khotieudung.com/wp-content/uploads/2023/02/may-song-hong-mo-them-nha-may-may-xuat-khau-tai-nam-dinh.jpg"
              alt=""
              className="w-[548px] h-[493px] max-sm:size-auto object-cover"
            />
          </div>
          <div className="w-[570px] max-xl:w-full">
            <h3
              className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]"
              style={{ lineHeight: "123.81%" }}
            >
              Xây dựng thương hiệu
            </h3>
            <p
              className={`py-12 text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300 ${
                expandedItems[1] ? "max-h-[1000px]" : "max-h-[120px]" // Giới hạn chiều cao cho 5-6 dòng
              }`}
              style={{ lineHeight: "166.67%" }}
            >
              Từ những cánh đồng bông organic trải rộng, chúng tôi mang đến
              những sợi vải tinh khiết nhất. Tại nhà máy của chúng tôi, những
              sợi vải này được dệt tỉ mỉ, kết hợp với công nghệ may mặc hiện đại
              từ Trung Quốc để tạo ra những bộ quần áo thoải mái, bền đẹp. Mỗi
              sản phẩm đều mang trong mình tâm huyết của đội ngũ thiết kế, những
              người luôn không ngừng sáng tạo để mang đến cho bạn những trải
              nghiệm thời trang mới mẻ. Chúng tôi tin rằng, thời trang không chỉ
              là về vẻ đẹp bên ngoài mà còn là về sự tôn trọng đối với con người
              và môi trường.
            </p>
            <button
              onClick={() => handleToggle("1")}
              className=" text-[#005D63] max-sm:text-xl hover:underline focus:outline-none"
            >
              {expandedItems[1] ? "Hidden" : "View More"}
            </button>
          </div>
        </div>
        <div
          id="2"
          className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center my-24"
        >
          <div className="w-[570px] max-xl:w-full">
            <h3
              className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]"
              style={{ lineHeight: "123.81%" }}
            >
              Tập chung vào khách hàng
            </h3>
            <p
              className={`py-12 text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300 ${
                expandedItems[2] ? "max-h-[1000px]" : "max-h-[120px]" // Giới hạn chiều cao cho 5-6 dòng
              }`}
              style={{ lineHeight: "166.67%" }}
            >
              Tập trung vào khách hàng là chìa khóa để xây dựng thương hiệu bền
              vững. Khách hàng hài lòng sẽ không chỉ trở lại mua sắm, mà còn
              giới thiệu sản phẩm, dịch vụ của bạn đến bạn bè và người thân. Đây
              là một phương thức marketing tự nhiên và hiệu quả nhất. Sự giới
              thiệu từ những người đã trải nghiệm và cảm thấy hài lòng là nguồn
              lực giúp mở rộng thị trường mà không tốn nhiều chi phí cho quảng
              cáo. Điều này không chỉ tăng doanh thu mà còn mở ra cơ hội kinh
              doanh mới. Khi khách hàng cảm nhận được rằng doanh nghiệp không
              chỉ bán sản phẩm mà còn đồng hành với họ trong hành trình trải
              nghiệm, họ sẽ yêu mến và trung thành với thương hiệu. Điều này sẽ
              giúp doanh nghiệp xây dựng một thương hiệu mạnh mẽ, tạo sự khác
              biệt trên thị trường và định hình được hình ảnh tích cực trong mắt
              công chúng.
            </p>
            <button
              onClick={() => handleToggle("2")}
              className=" text-[#005D63] max-sm:text-xl hover:underline focus:outline-none"
            >
              {expandedItems[2] ? "Hidden" : "View More"}
            </button>
          </div>
          <div>
            <img
              src="https://blog.dktcdn.net/files/mo-shop-quan-ao1.jpg"
              alt=""
              className="w-[548px] h-[493px] max-sm:size-auto object-cover"
            />
          </div>
        </div>
        <div
          id="3"
          className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center my-24"
        >
          <div>
            <img
              src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/techblog/nhan-vien-cham-soc-khach-hang-1-16866240351674.png"
              alt=""
              className="w-[548px] h-[493px] max-sm:size-auto object-cover"
            />
          </div>
          <div className="w-[570px] max-xl:w-full">
            <h3
              className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]"
              style={{ lineHeight: "123.81%" }}
            >
              Chăm sóc khách hàng
            </h3>
            <p
              className={`py-12 text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300 ${
                expandedItems[3] ? "max-h-[1000px]" : "max-h-[120px]" // Giới hạn chiều cao cho 5-6 dòng
              }`}
              style={{ lineHeight: "166.67%" }}
            >
              Khách hàng muốn được lắng nghe. Khi bạn dành thời gian lắng nghe ý
              kiến, phản hồi và nhu cầu của khách hàng, họ sẽ cảm thấy được trân
              trọng và hiểu rõ. Điều này tạo ra một mối liên kết mạnh mẽ giữa
              khách hàng và doanh nghiệp. Ví dụ, khi một khách hàng phàn nàn về
              một sản phẩm, việc lắng nghe và giải quyết vấn đề một cách nhanh
              chóng sẽ giúp họ cảm thấy được quan tâm và sẵn sàng quay lại mua
              hàng. Chúng tôi chăm sóc khách hàng qua các kênh như là: Trực tiếp
              tại cửa hàng,điện thoại(sms,call),email,các trang mạng xã hội hoặc
              bạn có thể gửi trực tiếp bản hồi qua phần contact của trang web
            </p>
            <button
              onClick={() => handleToggle("3")}
              className=" text-[#005D63] max-sm:text-xl hover:underline focus:outline-none"
            >
              {expandedItems[3] ? "Hidden" : "View More"}
            </button>
          </div>
        </div>
        {/* Avatar */}
      </div>
    </>
  );
}
