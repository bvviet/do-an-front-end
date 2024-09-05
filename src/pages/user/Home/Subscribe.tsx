import send from "../../../assets/icons/send.svg";

const Subscribe = () => {
    return (
        <div className="bg-[#005D63] py-[40px] lg:py-[164px] text-white">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-[3.2rem] lg:text-[5.8rem] font-bold leading-[117.241%] text-center">
                    Subscribe Newsletter
                </h2>
                <p className="text-[1.8rem] leading-[155.556%] w-[327px] sm:w-[430px] lg:w-[467px] text-center mt-[22px] mb-[10px] lg:mt-[35px] lg:mb-[70px]">
                    Sign up to recive 15% off your first order. We are giving the best and suitable services for our
                    customer
                </p>
                <form className="flex flex-wrap justify-center items-center gap-[20px] mt-[20px]">
                    <div className="flex items-center bg-white rounded-lg pl-[23px] ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="34" viewBox="0 0 44 34" fill="none">
                            <path
                                d="M40.1328 0H3.86719C1.73748 0 0 1.73559 0 3.86719V29.6484C0 31.7728 1.72975 33.5156 3.86719 33.5156H40.1328C42.2572 33.5156 44 31.7859 44 29.6484V3.86719C44 1.74281 42.2702 0 40.1328 0ZM39.5988 2.57812L22.082 20.095L4.41366 2.57812H39.5988ZM2.57812 29.1146V4.38874L14.9943 16.6984L2.57812 29.1146ZM4.40112 30.9375L16.8251 18.5135L21.1784 22.8295C21.6824 23.3291 22.4956 23.3275 22.9975 22.8255L27.2422 18.5808L39.5989 30.9375H4.40112ZM41.4219 29.1145L29.0652 16.7578L41.4219 4.40103V29.1145Z"
                                fill="#A6A6A6"
                            />
                        </svg>
                        <input
                            className="text-[#717580] pl-[16px] md:w-[264px]"
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter your email address here..."
                        />
                        <div className="cursor-pointer md:pl-[150px] xl:pl-[250px]">
                            <img src={send} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Subscribe;
