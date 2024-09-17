import { Link } from "react-router-dom";
import addIco from "@/assets/icons/add.svg";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "../../../Confirm";

const Address = () => {
  const { openPopup } = useModalContext();
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <p className="text-[1.9rem] font-bold">Địa chỉ của tôi</p>
        <Link
          to={"/profile/addresses/add"}
          className="flex items-center gap-2 hover:opacity-60"
        >
          <img src={addIco} /> <p>Thêm mới</p>
        </Link>
      </div>
      <div className="my-10 h-[1px] w-full bg-slate-300"></div>
      <p className="text-[1.8rem] font-bold">Địa chỉ</p>
      <div className="my-10">
        <div className="flex items-center">
          <div className="flex w-[50%] flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Bàn Văn Việt</p>
              <div className="h-9 w-[1px] bg-slate-600"></div>
              <span>(+84) 325 762 185</span>
            </div>
            <div>
              <p>24a Ngõ 123 Đường Xuân Phương</p>{" "}
              <span>Phường Phương Canh</span>, <span>Quận Nam Từ Liêm</span>,{" "}
              <span>Hà Nội</span>
            </div>
            <p className="w-fit rounded-md border border-solid border-red-500 px-2 text-red-500">
              Mặc định
            </p>
          </div>
          <div className="flex flex-1 flex-col items-end gap-3">
            <Link
              to={"/profile/addresses/add"}
              className="text-cyan-500 hover:opacity-60"
            >
              Cập nhật
            </Link>
            <div
              onClick={() =>
                openPopup(<Confirm handleDelete={() => alert("Xoa")} />)
              }
              className="cursor-pointer text-pink-500 hover:opacity-60"
            >
              Xóa
            </div>
            <div className="w-fit cursor-pointer rounded-md border border-solid border-violet-500 px-2 text-violet-500 hover:opacity-60">
              Thiết lập mặc định
            </div>
          </div>
        </div>
        <div className="my-10 h-[1px] w-full bg-slate-300"></div>
      </div>
      <div className="my-10">
        <div className="flex items-center">
          <div className="flex w-[50%] flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Bàn Văn Việt</p>
              <div className="h-9 w-[1px] bg-slate-600"></div>
              <span>(+84) 325 762 185</span>
            </div>
            <div>
              <p>24a Ngõ 123 Đường Xuân Phương</p>{" "}
              <span>Phường Phương Canh</span>, <span>Quận Nam Từ Liêm</span>,{" "}
              <span>Hà Nội</span>
            </div>
            <p className="w-fit rounded-md border border-solid border-red-500 px-2 text-red-500">
              Mặc định
            </p>
          </div>
          <div className="flex flex-1 flex-col items-end gap-5">
            <Link
              to={"/profile/addresses/add"}
              className="text-cyan-500 hover:text-indigo-500"
            >
              Cập nhật
            </Link>
            <div className="w-fit cursor-pointer rounded-md border border-solid border-violet-500 px-2 text-violet-500">
              Thiết lập mặc định
            </div>
          </div>
        </div>
        <div className="my-10 h-[1px] w-full bg-slate-300"></div>
      </div>
    </div>
  );
};
export default Address;
