import add from "../../../../assets/icons/add.svg";

import flight from "../../../../assets/icons/IconProfiles/flight.svg";
import flightSmall from "../../../../assets/icons/IconProfiles/flightSmall.svg";
import oval from "../../../../assets/icons/IconProfiles/Oval.svg";
import la from "../../../../assets/icons/IconProfiles/la.svg";
import laBig from "../../../../assets/icons/IconProfiles/laBig.svg";
import messages from "@/assets/icons/message.svg";
import phone from "@/assets/icons/IconProfiles/phone.svg";
import location from "@/assets/icons/location.svg";
import { useModalContext } from "../../../../contexts/ModelPopUp/ModelProvider";
import FormUpdateInfo from "./FormUpdateInfo";


const ProfileRight = () => {
    const { openPopup } = useModalContext();
    return (
        <div className="flex flex-col gap-[30px]">
            {/* My wallet */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <h2 className="text-[24px] font-bold leading-tight">My Wallet</h2>
                    <p className="text-[15px]">Payment methods</p>
                </div>
                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-[16px]">
                    {/* item 1 */}
                    <div className="">
                        <article className="p-[20px] relative rounded-[10px] bg-[#1E2E69]">
                            <img src={flight} alt="" className="absolute top-0 right-0" />
                            <div className="flex gap-[6px]">
                                <img src={flightSmall} alt="" />
                                <span className="text-white font-medium">FeatherCard</span>
                            </div>
                            <div className="mt-[37px] mb-[20px] text-[1.8rem] text-white font-medium">
                                1234 4567 8901 2221
                            </div>
                            <div className="flex items-center text-white justify-between">
                                <div>
                                    <p className="text-[0.8rem]">Card Holder</p>
                                    <p className="text-[1rem] font-medium">Imran Khan</p>
                                </div>
                                <div className="">
                                    <p className="text-[0.8rem]">Card Holder</p>
                                    <p className="text-[1rem] font-medium">Imran Khan</p>
                                </div>
                                <div className="">
                                    <img src={oval} alt="" className="" />
                                </div>
                            </div>
                        </article>
                    </div>
                    {/* item 2 */}
                    <div className="">
                        <article className="p-[20px] relative rounded-[10px] bg-[#354151]">
                            <img src={laBig} alt="" className="absolute top-0 right-0" />
                            <div className="flex gap-[6px]">
                                <img src={la} alt="" />
                                <span className="text-white font-medium">FeatherCard</span>
                            </div>
                            <div className="relative z-2 mt-[37px] mb-[20px] text-[1.8rem] text-white font-medium">
                                1234 4567 8901 2221
                            </div>
                            <div className="flex items-center text-white justify-between">
                                <div>
                                    <p className="text-[0.8rem]">Card Holder</p>
                                    <p className="text-[1rem] font-medium">Imran Khan</p>
                                </div>
                                <div className="">
                                    <p className="text-[0.8rem]">Card Holder</p>
                                    <p className="text-[1rem] font-medium">Imran Khan</p>
                                </div>
                                <div className="">
                                    <img src={oval} alt="" className="relative z-2" />
                                </div>
                            </div>
                        </article>
                    </div>
                    {/* item 3 */}
                    <div className="">
                        <a
                            href="#!"
                            className="w-full h-full min-h-[170px] rounded-[10px] border border-dashed border-[#d2d1d6] flex flex-col items-center justify-center"
                        >
                            <img src={add} alt="" />
                            <p className="text-[#D2D1D6] font-medium mt-[14px]">Add New Card</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Account info */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <h2 className="text-[24px] font-bold leading-tight">Basic information</h2>
                    <p className="text-[15px]">Addresses, contact information and password</p>
                </div>
                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[16px]">
                    {/* item 1 */}
                    <a href="#!" onClick={() => openPopup(<FormUpdateInfo />)}>
                        <article className="flex items-center gap-[10px] p-[10px] bg-[#f1f1f1] rounded-[10px]">
                            <div className="p-[15px] flex justify-center flex-shrink-0 rounded-lg bg-white">
                                <img src={messages} alt="" />
                            </div>
                            <div>
                                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">Email Address</h3>
                                <p>tarek97.ta@gmail.com</p>
                            </div>
                        </article>
                    </a>
                    {/* item 2 */}
                    <a href="#!" onClick={() => openPopup(<FormUpdateInfo />)}>
                        <article className="flex items-center gap-[10px] p-[10px] bg-[#f1f1f1] rounded-[10px]">
                            <div className="p-[15px] flex justify-center flex-shrink-0 rounded-lg bg-white">
                                <img src={phone} alt="" />
                            </div>
                            <div>
                                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">Phone number</h3>
                                <p>+000 11122 2345 657</p>
                            </div>
                        </article>
                    </a>
                    {/* item 3 */}
                    <a href="#!" onClick={() => openPopup(<FormUpdateInfo />)}>
                        <article className="flex items-center gap-[10px] p-[10px] bg-[#f1f1f1] rounded-[10px]">
                            <div className="p-[15px] flex justify-center flex-shrink-0 rounded-lg bg-white">
                                <img src={location} alt="" />
                            </div>
                            <div>
                                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">Add an address</h3>
                                <p>Bangladesh Embassy, Washington, DC 20008</p>
                            </div>
                        </article>
                    </a>
                </div>
            </div>

            {/* Account info */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <h2 className="text-[24px] font-bold leading-tight">Social network information</h2>
                    <p className="text-[15px]">Manage links to your social media sites.</p>
                </div>
                <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[16px]">
                    {/* item 1 */}
                    <a href="#!" onClick={() => openPopup(<FormUpdateInfo />)}>
                        <article className="flex items-center gap-[10px] p-[10px] bg-[#f1f1f1] rounded-[10px]">
                            <div className="p-[15px] flex justify-center flex-shrink-0 rounded-lg bg-white">
                                <img src={location} alt="" />
                            </div>
                            <div>
                                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">Facebook</h3>
                                <p>Not updated yet</p>
                            </div>
                        </article>
                    </a>
                    {/* item 2 */}
                    <a href="#!" onClick={() => openPopup(<FormUpdateInfo />)}>
                        <article className="flex items-center gap-[10px] p-[10px] bg-[#f1f1f1] rounded-[10px]">
                            <div className="p-[15px] flex justify-center flex-shrink-0 rounded-lg bg-white">
                                <img src={location} alt="" />
                            </div>
                            <div>
                                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">TikTok</h3>
                                <p>Not updated yet</p>
                            </div>
                        </article>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileRight;
