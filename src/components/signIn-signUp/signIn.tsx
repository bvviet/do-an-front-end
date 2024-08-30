import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import "./signIn.css";
import SignUp from "./signUp";
export default function SignIn() {
    const { openPopup } = useModalContext();
    return (
        <>
            <div className="bg-custom-white mx-auto w-[470px] h-[660px] border-2 border-black">
                <div className="mx-[30px] pt-[30px]">
                    <div className="flex justify-between items-center">
                        <p className="signin">Sign In</p>
                        <div onClick={() => openPopup(<SignUp />)}>
                            <button className="btn">
                                <p>Sign Up</p>
                            </button>
                        </div>
                    </div>
                    <form>
                        <div className="mt-[3rem]">
                            <label className="">Email</label>
                            <input id="input-field" className="w-full" type="text" placeholder=" " />
                        </div>
                        <div className="mt-[3rem]">
                            <label className="">Password</label>
                            <input id="input-field" className="w-full" type="text" placeholder=" " />
                        </div>
                        {/* Check box */}
                        <div className="flex mt-[3rem] justify-between items-center">
                            <div className="flex items-center">
                                <input type="checkbox" name="" id="" />
                                <label className="pl-[0.5rem]">Remember me</label>
                            </div>
                            <p className="forgot">Forgot password?</p>
                        </div>
                    </form>
                    {/* button Sign In */}
                    <div className="w-full bg-[#005D63] h-[50px] flex items-center justify-center mt-[3rem]">
                        <button>Sign In</button>
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
                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 19 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                                    fill="#EB4335"
                                />
                            </svg>
                            <p className=" ml-[13px] ">Continue with Google</p>
                        </button>

                        <button
                            aria-label="Continue with twitter"
                            role="button"
                            className="flex items-center w-[255px] h-[50px] mx-auto btn-signin pl-[13px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24px"
                                height="24px"
                                viewBox="0 0 50 50"
                            >
                                <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                            </svg>
                            <p className="ml-[13px]">Continue with Apple</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
