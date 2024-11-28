import { setCart } from "@/redux/slices/CartSlice";
import { useGetCartQuery } from "@/services/authApi";
import { useCheckoutMutation } from "@/services/productApi";
import { IVoucher } from "@/types/voucher";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "@/utils/formatCurrency";
import ItemOrder from "./ItemOrder";
import { RootState } from "@/redux/store";
type RadioValue = "1" | "0" | null;

const ThanhToan: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioValue>("0");
  const [note, setNote] = useState<string>("");
  const navigate = useNavigate();
  const [checkout] = useCheckoutMutation();
  const [isLoadingg, setIsLoadingg] = useState<boolean>(false);
  const disPatch = useDispatch();
  const { data: carts, isLoading, error, refetch } = useGetCartQuery();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
  const [vouchers, setVouchers] = useState<IVoucher[]>([]); // Lưu voucher
  const handleRadioChange = (value: RadioValue) => {
    setSelectedRadio(value);
  };

  const handleCheckout = async () => {
    setIsLoadingg(true);
    try {
      const checkoutData = new FormData();
      checkoutData.append("payment_method", selectedRadio ?? "0");
      checkoutData.append("note", note);
      if (selectedVoucher) {
        checkoutData.append("voucher_code", selectedVoucher.code); // Thêm mã voucher vào yêu cầu
      }
      const response = await checkout(checkoutData).unwrap();

      if (selectedRadio === "1" && response.payment_url) {
        toast.success("Cảm ơn bạn đã mua hàng");
        setTimeout(() => {
          window.location.href = response.payment_url;
        }, 2000);
        refetch();
        disPatch(setCart([]));
        navigate("/thanks");
      } else {
        toast.success("Cảm ơn bạn đã mua hàng");
        refetch();
        disPatch(setCart([]));
        navigate("/thanks");
      }
    } catch (error) {
      toast.error("Thanh toán thất bại");
      console.error("Thanh toán thất bại", error);
    } finally {
      setIsLoadingg(false);
    }
  };

  useEffect(() => {
    // Kiểm tra nếu URL hiện tại chứa chuỗi "http://localhost:5173/payment/success"
    if (
      window.location.href.includes("http://localhost:5173/payment/success")
    ) {
      // Điều hướng đến trang "thank you"
      navigate("/thanks"); // Chỉ dùng đường dẫn tương đối
    }
  }, [navigate]);

  useEffect(() => {
    if (carts && Array.isArray(carts)) {
      // Chỉ cập nhật giỏ hàng nếu carts có dữ liệu hợp lệ
      disPatch(setCart(carts));
    }
  }, [disPatch, carts]);

  const token = useSelector((state: RootState) => state.auth.access_token);

  // Gọi API để lấy voucher
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/voucher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Truy cập mảng vouchers từ thuộc tính `data`
        const vouchersData = response.data.data.vouchers || []; // Đảm bảo vouchersData là mảng
        setVouchers(vouchersData);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy voucher: ", error);
      });
  }, [token]);

  const handleVoucherSelect = (voucher: IVoucher) => {
    console.log("Voucher selected:", voucher);
    setSelectedVoucher(voucher);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const subtotal = (() => {
    if (!carts?.total_price || !selectedVoucher?.discount_value) {
      return 0;
    }

    const discountValue = parseFloat(selectedVoucher.discount_value.toString());
    const totalPrice = parseFloat(carts.total_price.toString());
    console.log("Total Price:", totalPrice);
    console.log("Discount Value:", discountValue);

    // Nếu discount_value lớn hơn 1000, dùng trực tiếp giá trị giảm giá
    if (discountValue > 1000) {
      return Math.max(0, discountValue); // Đảm bảo không trả về giá trị âm
    }

    // Nếu discount_value nhỏ hơn hoặc bằng 99, tính theo phần trăm
    if (discountValue <= 99) {
      return (totalPrice * discountValue) / 100;
    }
    return 0
  })();
  const discount = parseFloat(selectedVoucher?.max_discount || "0");
  const total =
    carts?.total_price
      ? carts.total_price - Math.min(subtotal, discount)
      : 0;

  console.log("toorngh tíadf", discount);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (error)
    return <div className="text-red-500">Lỗi khi lấy dữ liệu giỏ hàng</div>;

  return (
    <div className="">
      <div className="">
        <div className="max-lg:hidden">
          <ItemOrder />
        </div>
        <div className="bg-white">
          <div className="col-span-12 px-6 pb-12 lg:w-auto">
            <label
              htmlFor="note"
              className="text-[1.8rem] font-medium max-lg:text-[14px] lg:text-[1.8rem]"
            >
              Ghi chú
            </label>
            <div>
              <textarea
                id="note"
                className="mt-3 flex w-full items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px] max-lg:text-[14px]"
                placeholder="Nói cho tôi điều bạn muốn"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-[#C4D1D0]"></div>

        <div className="bg-white py-7 pl-7 pr-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[18px] font-medium">
              <i
                className="fa-solid fa-ticket text-red-600"
                style={{ transform: "rotate(120deg)" }}
              ></i>
              Chiết khấu của TopDeal
            </div>
            <button
              onClick={togglePopup}
              className="text-[14px] font-medium text-[#05a]"
            >
              Chọn Voucher
            </button>
          </div>
          {selectedVoucher && (
            <div className="mt-3 flex items-center justify-between text-[14px] font-normal">
              <p className="ml-11">Voucher và khuyến mãi</p>
              <p className="text-red-600">Đã quy đổi 1</p>
            </div>
          )}
          {isPopupOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative max-h-[500px] w-full max-w-[700px] overflow-hidden rounded-lg bg-white p-6 shadow-lg max-sm:w-[320px]">
                <button
                  onClick={togglePopup}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
                <h2 className="mb-4 text-[20px] font-medium">
                  Chọn TopDeal Voucher
                </h2>
                <div className="my-2 h-[1px] w-full bg-slate-300"></div>
                <div>
                  <p className="mb-6 text-[18px] font-medium">TopDeal</p>
                </div>
                <div className="max-h-[300px] space-y-4 overflow-y-auto">
                  <div>
                    {Array.isArray(vouchers) && vouchers.length > 0 ? (
                      vouchers.map((voucher) => (
                        <label
                          key={voucher.id}
                          className={`mb-6 block cursor-pointer gap-4 rounded-lg border bg-red-100 p-4 ${selectedVoucher === voucher
                            ? "border-red-500"
                            : "border-gray-300"
                            }`}
                        >
                          <span>
                            {voucher.name} {voucher.code}
                          </span>
                          <div className="flex items-center justify-between">
                            <p className="text-[18px] font-semibold">
                              Giảm{" "}
                              {parseFloat(voucher.discount_value) > 100
                                ? `${(formatCurrency(voucher.discount_value))}`
                                : `${voucher.discount_value}%`}
                            </p>
                            <input
                              type="radio"
                              name="voucher"
                              value={voucher.id}
                              onChange={() => handleVoucherSelect(voucher)}
                              checked={selectedVoucher?.id === voucher.id}
                            />
                          </div>
                          <p className="text-[16px]">
                            Đối với đơn hàng có giá trị trên{" "}
                            {formatCurrency(voucher.minimum_order_value)}, giảm
                            tối đa {formatCurrency(voucher.max_discount)}
                          </p>
                          <span className="text-[14px] text-red-500">
                            Hết hạn sau 12 giờ
                          </span>

                          <div className="my-2 border border-dashed border-gray-300"></div>
                          <p className="text-[14px]">
                            Áp dụng cho một số sản phẩm nhất định
                          </p>
                        </label>
                      ))
                    ) : (
                      <div className="text-center text-red-600">Không có voucher nào để hiển thị.</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={togglePopup}
                  className="mt-4 w-full rounded-lg bg-red-600 p-3 text-white hover:bg-red-700"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between border-b border-t border-solid border-gray-300 bg-white p-6 text-[#566363]">
          <div className="font-manrope text-[16px] font-medium leading-[171.429%] max-lg:text-[14px]">
            <p>Tổng tiền hàng</p>
            <p>Chiết khấu của TopDeal</p>
            <p>Phí vận chuyển</p>
          </div>
          <div className="text-end font-manrope text-[16px] font-medium leading-[171.429%] max-lg:text-[14px]">
            <p>{formatCurrency(carts?.total_price ?? 0)}</p>
            <p className="text-red-600">-
              {subtotal > discount
                ? formatCurrency(discount)
                : formatCurrency(subtotal)}
            </p>
            <p>Miễn phí</p>
          </div>
        </div>
        <div className="bg-white p-6">
          <div className="flex justify-between font-manrope text-[20px] font-bold leading-[171.429%] text-red-600">
            <p className="">Tổng tiền</p>
            <p className="">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>
      <div className="rounded-b-lg bg-white">
        <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>
        <div className="px-6">
          <label className="flex items-center gap-5 max-lg:mx-0 max-lg:text-[14px]">
            <input
              type="radio"
              value="1"
              checked={selectedRadio === "1"}
              onChange={() => handleRadioChange("1")}
            />
            <div className="my-2 flex h-[60px] w-full items-center justify-between">
              <p>Thanh toán trực tuyến an toàn bằng cổng thanh toán VNPAY</p>
              <img
                className="object-contain max-lg:h-[28px] max-lg:w-[52px]"
                src="https://bizweb.dktcdn.net/assets/themes_support/vnpay_icon.png"
                alt="VNPAY"
              />
            </div>
          </label>
        </div>

        <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>
        <div className="my-6 px-6">
          <label className="flex gap-5 max-lg:mx-0 max-lg:text-[14px]">
            <input
              type="radio"
              value="0"
              checked={selectedRadio === "0"}
              onChange={() => handleRadioChange("0")}
            />
            <div className="my-2 flex w-full items-center justify-between">
              <p>Ship COD</p>
              <img
                className="h-auto w-[50px] object-contain max-lg:h-auto max-lg:w-[40px]"
                src="https://png.pngtree.com/png-clipart/20231011/ourmid/pngtree-green-dollar-money-cartoon-png-image_10208428.png"
                alt="COD"
              />
            </div>
          </label>
        </div>

        <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>

        <div className="mt-6 flex justify-between p-6">
          <Link
            to={"#"}
            className="flex items-center gap-2 text-[16px] text-[#566363] hover:text-black max-lg:text-[14px]"
          >
            <i className="fa-solid fa-chevron-left"></i>
            <p>Quay lại giỏ hàng</p>
          </Link>
          <button
            onClick={handleCheckout}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FFD44D] px-12 py-4 font-manrope text-[18px] leading-[166.667%] text-black max-lg:text-[14px]"
            disabled={isLoadingg}
          >
            {isLoadingg ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Thanh toán"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
