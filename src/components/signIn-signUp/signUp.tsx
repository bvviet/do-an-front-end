import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import SignIn from "./signIn";
import "./signIn.css";
export default function SignUp() {
    const { openPopup } = useModalContext();
    return (
        <>
            <div className="bg-custom-white mx-auto w-[470px] h-full max-sm:w-full border-2 border-black">
                <div className="mx-[30px] pt-[30px]">
                    <p className="signin">Create your account</p>
                    <form>
                        <div className="mt-[3rem]">
                            <label htmlFor="email" className="max-sm:text-2xl">
                                Email
                            </label>
                            <input
                                id="email"
                                className="w-full"
                                type="email"
                                placeholder=" "
                            />
                        </div>
                        <div className="mt-[3rem]">
                            <label htmlFor="name" className="max-sm:text-2xl">
                                Name
                            </label>
                            <input id="name" className="w-full" type="text" placeholder=" " />
                        </div>
                        <div className="mt-[3rem]">
                            <label htmlFor="password" className="max-sm:text-2xl">
                                Password
                            </label>
                            <input
                                id="password"
                                className="w-full"
                                type="password"
                                placeholder=" "
                            />
                        </div>
                        <div className="mt-[3rem]">
                            <label htmlFor="confirmpw" className="max-sm:text-2xl">
                                Confirm password
                            </label>
                            <input
                                id="confirmpw"
                                className="w-full"
                                type="password"
                                placeholder=" "
                            />
                        </div>
                    </form>
                    {/* Button Sign Up */}
                    <div className="w-full bg-[#005D63] h-[3.125em] flex items-center justify-center mt-[3rem]">
                        <button>Sign Up</button>
                    </div>
                    <button className="flex items-center mt-6" onClick={() => openPopup(<SignIn />)}>
                        <i className="fas fa-arrow-left text-[#566363] hover:text-[#a9c5c5]"></i>
                        <span className="ml-3 text-[#566363] text-[16px]">Quay lại trang Login</span>
                    </button>
                    <div className="flex items-center w-full mt-[3.5rem] pb-[0.25rem]">
                        <hr className="flex-grow border-t border-[#C4D1D0]" />
                        <span className="mx-[1.25rem] or">OR</span>
                        <hr className="flex-grow border-t border-[#C4D1D0]" />
                    </div>
                    {/* Đăng nhập bằng cách khác */}
                    <div>
                        <button
                            aria-label="Continue with google"
                            role="button"
                            className="flex items-center w-[255px] h-[50px] mx-auto btn-signin pl-[13px]"
                        >
                            <img src="/src/images/image803.png" alt="" />
                            <p className=" ml-[13px] ">Continue with Facebook</p>
                        </button>
                        <button
                            aria-label="Continue with google"
                            role="button"
                            className="flex items-center w-[255px] h-[50px] mx-auto btn-signin pl-[13px]"
                        >
                            <img src="/src/images/image804.png" alt="" />
                            <p className=" ml-[13px] ">Continue with Google</p>
                        </button>

                        <button
                            aria-label="Continue with twitter"
                            role="button"
                            className="flex items-center w-[255px] h-[50px] mx-auto btn-signin pl-[13px]"
                        >
                            <img src="/src/images/image805.png" alt="" />
                            <p className="ml-[13px]">Continue with Apple</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
