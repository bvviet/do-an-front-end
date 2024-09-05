import ColumsItem from "./col";
import HeaderAbout from "./headerAbout";
import People from "./people";

export default function ItemAbout() {
  return (
    <>
      <div>
        <HeaderAbout />
        {/* Tầm nhìn */}
        <div>
          <h3
            className="font-slab text-[42px] max-lg:text-[28px] text-center font-bold text-[#131717]"
            style={{ lineHeight: "123.81%" }}
          >
            Tầm nhìn
          </h3>
          <p className="py-12 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            Chúng tôi cố gắng để thương hiệu của mình được phổ biến và trở thành
            trang phục mặc hằng ngày cho mọi người
          </p>
        </div>
        {/* Giá trị cốt lõi */}
        <div>
          <h3
            className="font-slab text-[42px] max-lg:text-[28px] text-center font-bold text-[#131717]"
            style={{ lineHeight: "123.81%" }}
          >
            Giá trị cốt lõi
          </h3>
          <p className="py-8 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            <strong>Chất lượng vượt trội: </strong> Mỗi sản phẩm đều được chăm
            chút tỉ mỉ, từ khâu lựa chọn chất liệu đến đường kim mũi chỉ, đảm
            bảo sự bền đẹp và thoải mái.
          </p>
          <p className="pb-8 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            <strong>Phong cách đa dạng: </strong>Chúng tôi không ngừng cập nhật
            những xu hướng thời trang mới nhất, mang đến sự lựa chọn phong phú
            để bạn thỏa sức thể hiện bản thân.
          </p>
          <p className="pb-8 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            <strong>Khách hàng là trung tâm: </strong> Sự hài lòng của bạn là
            động lực lớn nhất để chúng tôi không ngừng cải thiện sản phẩm và
            dịch vụ.
          </p>
          <p className="pb-8 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            <strong>Luôn đổi mới và không ngừng học: </strong> Học từ chính đối
            thủ, học từ những công ty thời trang tốt ở trong nước và quốc tế và
            luôn luôn lắng nghe mọi góp ý từ phía học viên.
          </p>
          <p className="pb-8 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal">
            <strong>Tư duy bền vững: </strong> Có hai thứ đáng để đầu tư giúp
            mang lại thành quả tài chính tốt nhất trong dài hạn của một công ty
            đó là nhân viên và khách hàng.
          </p>
        </div>
        {/* Thứ bạn nhận được */}
        <div className="w-[984px] mx-auto max-xl:w-full border border-gray-800 border-solid p-12 rounded shadow-xl bg-[#005D63]">
          <h3
            className="font-slab text-[42px] max-lg:text-[28px] text-center font-bold text-white"
            style={{ lineHeight: "123.81%" }}
          >
            Bạn nhận được gì ở tôi
          </h3>
          <div className="grid grid-cols-2 mx-auto max-sm:grid-cols-1 gap-24 mt-12 max-sm:gap-5 ">
            <div>
              <h3
                className="font-slab text-[2.5rem]  max-lg:text-[2rem] font-bold text-white"
                style={{ lineHeight: "123.81%" }}
              >
                1. Sản phẩm chất lượng cao{" "}
              </h3>
              <p className="py-8 text-[18px] max-lg:text-[14px] text-white font-manrope font-normal">
                Đảm bảo về chất liệu, kiểu dáng và độ bền.
              </p>
            </div>
            <div>
              <h3
                className="font-slab text-[2.5rem] max-lg:text-[2rem] font-bold text-white"
                style={{ lineHeight: "123.81%" }}
              >
                2. Phong cách thời trang đa dạng{" "}
              </h3>
              <p className="py-8 text-[18px] max-lg:text-[14px] text-white font-manrope font-normal">
                Mục tiêu của chúng tôi là hướng đến quần áo các bạn mặc hàng
                ngày thế nên chúng tôi thiết kế sao cho phù hợp với mọi lứa tuổi
                mọi hoàn cảnh
              </p>
            </div>
            <div>
              <h3
                className="font-slab text-[2.5rem] max-lg:text-[2rem] font-bold text-white"
                style={{ lineHeight: "123.81%" }}
              >
                3. Tiết kiệm tài chính
              </h3>
              <p className="py-8 text-[18px] max-lg:text-[14px] text-white font-manrope font-normal">
                Chúng tôi hướng đến việc làm ra các sản phẩm có mức giá thành rẻ
                để phù hợp với tài chính ai cũng có thể sở hữu được nó
              </p>
            </div>
            <div>
              <h3
                className="font-slab text-[2.5rem]  max-lg:text-[2rem] font-bold text-white"
                style={{ lineHeight: "123.81%" }}
              >
                4. Dịch vụ khách hàng chuyên nghiệp
              </h3>
              <p className="py-8 text-[18px] max-lg:text-[14px] text-white font-manrope font-normal">
                Nhân viên tư vấn chúng tôi được đào tạo bài bản, chính sách
                thanh toán và đổi trả của chúng tôi được triển khai cụ thể ở
                biên lai khi các bạn thanh toán
              </p>
            </div>
          </div>
        </div>
        <ColumsItem />
        {/* Avatar */}
        <div className="flex">
          <div className="w-[48%] max-md:w-full mb-12">
            <h3
              className="font-slab text-[38px] max-lg:text-[28px] font-bold text-[#131717]"
              style={{ lineHeight: "123.81%" }}
            >
              Các thành viên của chúng tôi
            </h3>
           
          </div>
        </div>
        <People />
      </div>
    </>
  );
}
