export default function ItemOrder() {
  return (
    <>
      <h3 className=" text-[2rem] lg:text-[2.8rem] font-medium leading-[145.455%]">
        Đơn hàng (1 sản phẩm)
      </h3>
      <div className="border-b border-[#C4D1D0] mt-4 border-solid"></div>
      <div className="mb-8">
        <div className="mt-8">
          <div className="flex gap-5">
            <img
              src="https://down-vn.img.susercontent.com/file/89477e8a1bd94ca7cce477e8cb25b75b"
              alt=""
              className="w-[80px] h-[80px] border border-solid border-gray-300 rounded-lg p-2"
            />
            <div className="flex justify-between items-center w-full">
              <div className="w-[75%]">
                <p className="text-[18px] max-lg:text-[14px] font-manrope font-medium leading-[156.667%]">
                  Sản phẩm 1 siêu siêu siêu siêu siêu siêu siêu siêu siêu siêu
                </p>
                <p className="text-[12px] font-manrope text-[#566363]">
                  tienviet
                </p>
              </div>
              <div className=" text-[#566363] max-lg:text-[12px] font-medium">
                <p>990.000đ</p>
                <p className="text-end">x1</p>
              </div>
            </div>
          </div>
        </div>
        {/* item order */}
        
      </div>
    </>
  );
}
