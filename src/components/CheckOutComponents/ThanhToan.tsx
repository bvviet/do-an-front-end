import React, { useState } from "react";

type RadioValue = "option1" | "option2" | null;

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
      </div>
      {/* items 2 */}
      
      <div className="border-b border-[#C4D1D0] mb-6  border-solid"></div>
      <div className="my-6">
        <label className="flex gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="option2"
            defaultChecked
            checked={selectedRadio === "option2"}
            onChange={() => handleRadioChange("option2")}
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
      </div>
      <div className="border-b border-[#C4D1D0] mb-6  border-solid"></div>
    </div>
  );
};

export default ThanhToan;
