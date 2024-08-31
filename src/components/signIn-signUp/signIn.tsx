import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import "./signIn.css";
import SignUp from "./signUp";
export default function SignIn() {
    const { openPopup } = useModalContext();
    return (
        <>
            <div className="bg-white mx-auto max-sm:mx-0 w-[470px] h-full max-sm:w-full border-2 border-black">
                <div className="mx-[30px] max-sm:mx-[2.7rem] pt-[30px]">
                    <div className="flex items-center justify-between">
                        <p className="signin">Sign In</p>
                        <div onClick={() => openPopup(<SignUp />)}>
                            <button className="btn">
                                <p>Sign Up</p>
                            </button>
                        </div>
                    </div>
                    <form>
                        <div className="mt-[3rem]">
                            <label htmlFor="email" className="max-sm:text-2xl">
                                Email
                            </label>
                            <input id="email" className="w-full" type="text" placeholder=" " />
                        </div>
                        <div className="mt-[3rem]">
                            <label htmlFor="password" className="max-sm:text-2xl">
                                Password
                            </label>
                            <input id="password" className="w-full " type="text" placeholder=" " />
                        </div>
                        {/* Check box */}
                        <div className="flex mt-[3rem] justify-between items-center">
                            <div className="flex items-center">
                                <input type="checkbox" name="" id="checkbox" />
                                <label htmlFor="checkbox" className="pl-[0.5rem] max-sm:text-2xl">
                                    Remember me
                                </label>
                            </div>
                            <p className="forgot max-sm:text-2xl">Forgot password?</p>
                        </div>
                    </form>
                    {/* button Sign In */}
                    <div className="w-full bg-[#005D63] h-[50px] flex items-center justify-center mt-[3rem]">
                        <button className="">Sign In</button>
                    </div>
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
