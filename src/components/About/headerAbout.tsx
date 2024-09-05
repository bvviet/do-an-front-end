export default function HeaderAbout() {
  return (
    <>
      <div>
        <div
          id="1"
          className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center mt-24 "
        >
          <div>
            <img
              src="https://khotieudung.com/wp-content/uploads/2023/02/may-song-hong-mo-them-nha-may-may-xuat-khau-tai-nam-dinh.jpg"
              alt=""
              className="w-[538px] h-[318px] max-sm:size-auto object-cover"
            />
          </div>
          <div className="w-[570px] max-xl:w-full">
            <h3
              className="font-slab text-[30px] max-lg:text-[24px] font-bold text-[#131717]"
              style={{ lineHeight: "123.81%" }}
            >
              Bạn có biết ?
            </h3>
            <p
              className="py-12 text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300"
              style={{ lineHeight: "166.67%" }}
            >
              Có rất nhiều người, luôn đau đầu khi chọn quần áo. Ở đây là có ai
              đã từng mua những chiếc áo sơ mi giá rẻ, nhưng chỉ mặc được vài
              lần là đã bị nhàu, phai màu. Có những lần, bỏ ra một số tiền kha
              khá để mua một chiếc quần đẹp, nhưng khi mặc vào lại cảm thấy
              không thoải mái
            </p>
            <p
              className=" text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300"
              style={{ lineHeight: "166.67%" }}
            >
              Mình nhận ra rằng, rất nhiều người cũng đang gặp phải vấn đề tương
              tự. Họ muốn có những bộ quần áo vừa đẹp, vừa chất lượng, nhưng lại
              không muốn phải tốn quá nhiều thời gian và công sức để tìm
              kiếm.....
            </p>
          </div>
        </div>
        <div className="my-16">
          <p
            className="text-[18px] max-lg:text-[14px]  text-[#131717] font-manrope font-normal overflow-hidden transition-all duration-300"
            style={{ lineHeight: "166.67%" }}
          >
            Và rồi, tôi ở đây để giúp các bạn làm được điều đó. Chúng tôi là nơi
            bạn có thể tìm thấy những sản phẩm chất lượng cao với giá cả phải
            chăng. Tất cả các sản phẩm đều được lựa chọn kỹ lưỡng, đảm bảo về
            chất liệu và kiểu dáng. Hơn nữa, chúng tôi còn có một đội ngũ tư vấn
            viên thời trang sẵn sàng hỗ trợ bạn chọn được những bộ đồ phù hợp
            nhất
          </p>
        </div>
      </div>
    </>
  );
}
