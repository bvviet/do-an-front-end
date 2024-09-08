import { useModalContext } from "../../../../contexts/ModelPopUp/ModelProvider";


const FormUpdateInfo = () => {
    const { closePopup } = useModalContext();
    return (
        <div className="grid grid-cols-12 gap-3 bg-[#FAFAFD] p-5 lg:w-[390px]">
            <h2 className="col-span-12 text-[2.2rem] font-medium leading-[145.455% ]">Update info</h2>
            <form action="" className="col-span-12">
                {/* Form row 1 */}
                <div className=" gap-[20px]">
                    {/* Full name */}
                    <div className="w-full lg:w-auto mt-[10px]">
                        <label htmlFor="fullName" className="text-[2.2rem] font-medium">
                            Full name
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input id="fullName" type="text" placeholder="Full name" className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                    <div className="w-full lg:w-auto mt-[20px]">
                        <label htmlFor="" className="text-[2.2rem] font-medium">
                            Email address
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input type="text" placeholder="admin@uihut.com" className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                </div>

                {/* Form row 1 */}
                <div className="flex-col lg:flex-row flex-wrap gap-[30px] ">
                    <div className="w-full lg:w-auto mt-[20px]">
                        <label htmlFor="" className="text-[2.2rem] font-medium">
                            Phone number
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input type="text" placeholder="+008 01234 56789" className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                    <div className="w-full lg:w-auto mt-[20px]">
                        <label htmlFor="" className="text-[2.2rem] font-medium">
                            Password
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input type="text" placeholder="•••••••••" className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                </div>
                {/* Social */}
                <div className=" gap-[20px]">
                    {/* Personal websites */}
                    <div className="w-full lg:w-auto mt-[10px]">
                        <label htmlFor="" className="text-[2.2rem] font-medium">
                            Facebook
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input type="text" placeholder="https://facebook.com/username." className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                    <div className="w-full lg:w-auto mt-[20px]">
                        <label htmlFor="" className="text-[2.2rem] font-medium">
                            TikTok
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[48px] rounded-xl">
                            <input type="text" placeholder="https://tiktok.com/@username" className="w-full" />
                        </div>
                        <img
                            className="hidden"
                            src="https://sondnpt00343.github.io/f8-project-08/assets/icons/form-error.svg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between w-full mt-[20px]">
                    <div className="text-black cursor-pointer hover:opacity-65" onClick={closePopup}>
                        Cancel
                    </div>
                    <button className="text-black bg-[#FFB700] px-[20px] py-[10px] rounded-[30px] hover:opacity-65">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormUpdateInfo;
