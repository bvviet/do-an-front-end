import { Link } from "react-router-dom";

export default function ThankCompoment() {
    return <>
        <div className="flex flex-col justify-center items-center">
            <div><img src="src/images/shopping-bag.png" className="max-sm:w-[100px]" alt="" /></div>
            <div className="flex items-center gap-4 mt-2">
                <h2 className="text-[22px] font-manrope font-bold">Đã gửi đơn hàng</h2>
                <i className="fa-solid fa-check fa-xl" style={{ color: " #179770" }}></i>
            </div>
            <div className="max-w-[500px] max-sm:text-[14px] text-center font-manrope font-medium my-4">
                <span className="">Cảm ơn bạn đã mua hàng của chúng tôi. Cùng góp ý để chúng tôi cải tiến sản phẩm của mình hơn</span>
            </div>
            <div className="flex items-center gap-10 ">
                <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                    <span
                        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#005D63] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                    ></span>

                    <span
                        className="relative inline-block border-2 border-solid border-current px-8 py-3 text-lg font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
                    >
                        <p className="text-white">
                            Xem đơn hàng
                        </p>
                    </span>
                </a>
                <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                    <span
                        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#005D63] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                    ></span>

                    <Link to={"/contacts"}
                        className="relative inline-block border-2 border-solid border-current px-8 py-3 text-lg font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
                    >
                        <p className="text-white">
                            Góp ý với chúng tôi
                        </p>
                    </Link>
                </a>
            </div>
        </div>

    </>
}