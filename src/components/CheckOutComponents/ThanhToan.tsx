import React, { useState } from "react";

type RadioValue = "option1" | "option2" | "option3" | null;

const ThanhToan: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioValue>(null);

  const handleRadioChange = (value: RadioValue) => {
    setSelectedRadio(value);
  };

  return (
    <div>
      <div className="mt-6">
        <label className="flex items-center gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="option1"
            checked={selectedRadio === "option1"}
            onChange={() => handleRadioChange("option1")}
          />
          <p>
            Thanh toán trực tuyến an toàn bằng thẻ tín dụng Visa/Master Card/JCB
          </p>
          <img
            className="max-lg:w-[52px] max-lg:h-[28px] object-contain"
            src="https://bizweb.dktcdn.net/assets/themes_support/vnpay_icon.png"
            alt=""
          />
        </label>
        {selectedRadio === "option1" && (
          <div className="">
            <p className="text-[14px] font-medium py-2 font-manrope leading-[166.667%] mx-6">
              {" "}
              Chú ý: Freeshipping được xem là 1 chương trình khuyến mãi (CTKM).
              Các sản phẩm đang trong CTKM có thể không được áp dụng miễn phí
              giao hàng. TopDeal sẽ thông báo phí giao hàng nếu có khi xác nhận
              đơn hàng
            </p>
          </div>
        )}
      </div>
      <div className="border-b border-[#C4D1D0] mb-6  border-solid"></div>

      {/* items 2 */}
      <div className="my-6">
        <label className="flex gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="option2"
            checked={selectedRadio === "option2"}
            onChange={() => handleRadioChange("option2")}
          />
          <div className="flex items-center justify-between w-full my-2">
            <p className="flex-1">Chuyển khoản qua ngân hàng</p>
            <img
              className="h-auto w-[90px] object-contain max-lg:w-[90px] max-lg:h-[128px]"
              src="src/images/Remove-bg.ai_1726126395538.png"
              alt=""
            />
          </div>
        </label>
        {selectedRadio === "option2" && (
          <div className="">
            <p className="text-[14px] py-2 font-medium font-manrope leading-[166.667%] mx-6">
              - Mở ứng dụng Internet Banking
              <br />
              - Chọn Quét QR. Kiểm tra lại đúng số tiền cần thanh toán với hoá
              đơn, không sửa ghi chú hay thêm bất cứ thông tin nào.
              <br />- Nếu đúng số tiền cần thanh toán, bấm xác nhận thanh toán.
            </p>
            <p className="text-[14px] font-manrope font-medium leading-[166.667%] mx-6 mt-4">
              Chú ý: Freeshipping được xem là 1 chương trình khuyến mãi (CTKM).
              Các sản phẩm đang trong CTKM có thể không được áp dụng miễn phí
              giao hàng. TopDeal sẽ thông báo phí giao hàng nếu có khi xác nhận
              đơn hàng.
            </p>
          </div>
        )}
      </div>
      <div className="border-b border-[#C4D1D0] mb-6  border-solid"></div>
      <div className="my-6">
        <label className="flex gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="option3"
            checked={selectedRadio === "option3"}
            onChange={() => handleRadioChange("option3")}
          />
          <div className="flex items-center justify-between w-full my-2">
            <p>Ship COD</p>
            <img
              className="h-auto w-[50px] object-contain max-lg:w-[40px] max-lg:h-auto"
              src="https://png.pngtree.com/png-clipart/20231011/ourmid/pngtree-green-dollar-money-cartoon-png-image_10208428.png"
              alt=""
            />
          </div>
        </label>
        {selectedRadio === "option3" && (
          <div className="">
            <p className="text-[14px] py-2 font-medium font-manrope leading-[166.667%] mx-6">
              {" "}
              Chú ý: Freeshipping được xem là 1 chương trình khuyến mãi (CTKM).
              Các sản phẩm đang trong CTKM có thể không được áp dụng miễn phí
              giao hàng. TopDeal sẽ thông báo phí giao hàng nếu có khi xác nhận
              đơn hàng
            </p>
          </div>
        )}
      </div>
      <div className="border-b border-[#C4D1D0] mb-6  border-solid"></div>
    </div>
  );
};

export default ThanhToan;
