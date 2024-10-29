export default function OrderFail() {
    return <>
        <div className=" mb-12 ">
            {/* List */}
            <div className="rounded-lg px-8 flex items-center justify-between py-6 bg-white">
                <div className="flex items-center text-gray-500  hover:underline">
                    <i className="fa-solid fa-arrow-left pr-2"></i>
                    <p>Trở Lại</p>
                </div>
                <p className="text-red-600">Đã huỷ</p>
            </div>
            <div className="bg-[#FFFCF5] px-8 h-[80px] flex items-center border-t border-b rounded-lg border-solid border-gray-200 mb-4">
                <p className="text-red-600 text-[20px]">Đã huỷ đơn hàng </p>
            </div>
            {/* items sản phẩm */}
            <div className="bg-[#fafafa]  pt-4">
                <div className="flex items-center justify-between px-8 gap-6 py-4">
                    <div className="flex items-center gap-6">
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                        <div className="flex-1 max-w-[702px]">
                            <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                            <p className="text-gray-500">Phụ kiện</p>
                            <p>x1</p>

                            <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                                Hoàn trả hàng miễn phí 15 ngày
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                        <span className="text-gray-400 line-through">₫39.000</span>
                        <span className="text-red-600 font-bold">₫28.900</span>
                    </div>
                </div>
                <div className="bg-gray-300 w-full h-[1px]"></div>
                <div className="flex items-center justify-between px-8 gap-6 py-4">
                    <div className="flex items-center gap-6">
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                        <div className="flex-1 max-w-[702px]">
                            <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                            <p className="text-gray-500">Phụ kiện</p>
                            <p>x1</p>

                            <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                                Hoàn trả hàng miễn phí 15 ngày
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                        <span className="text-gray-400 line-through">₫39.000</span>
                        <span className="text-red-600 font-bold">₫28.900</span>
                    </div>
                </div>
                {/* Tính tiền  */}
                <div className=" flex items-center">
                    <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
                        <p>Yêu cầu bởi</p>
                    </div>
                    <div className="w-[30%] pr-8 py-5 text-right font-semibold  border border-solid border-gray-200">
                        <p>Người mua</p>
                    </div>
                </div>

                <div className=" flex items-center">
                    <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
                        <p>Phương thức thanh toán</p>
                    </div>
                    <div className="w-[30%] pr-8 py-5 text-right font-semibold border border-solid border-gray-200">
                        <p>Chưa thanh toán</p>
                    </div>
                </div>

                <div className=" flex items-center">
                    <div className="w-[70%] text-[16px] text-gray-500 pr-8  py-5 text-right border border-solid border-gray-200">
                        <p>Mã đơn hàng</p>
                    </div>
                    <div className="w-[30%] pr-8 py-5 text-right font-semibold text-red-600 border border-solid border-gray-200">
                        <p>241024D9PHXFSY</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}