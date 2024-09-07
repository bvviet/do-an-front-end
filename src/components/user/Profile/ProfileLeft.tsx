import profile from "../../../assets/icons/profile.svg";
import location from "../../../assets/icons/location.svg";
import message from "../../../assets/icons/message.svg";
import dowload from "../../../assets/icons/dowload.svg";
import heartprofile from "../../../assets/icons/heartprofile.svg";
import grif from "../../../assets/icons/gift.svg";
import shield from "../../../assets/icons/shield.svg";
import square from "../../../assets/icons/square.svg";
import danger from "../../../assets/icons/danger.svg";
import { Link } from "react-router-dom";
import AvatarComponent from "../../Avatar";

const ProfileLeft = () => {
    return (
        <aside>
            {/* User */}
            <div className="rounded-t-lg flex flex-col items-center w-full bg-cover bg-center bg-[url('https://sondnpt00343.github.io/f8-project-08/assets/img/profile/cover.png')] bg-no-repeat p-4 text-white px-[20px] pt-[40px] pb-[20px]">
                <AvatarComponent
                    width="110"
                    height="110"
                    urlImage="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <h1 className="mt-[20px] text-[1.8rem] font-bold">Imran Khan</h1>
                <p className="text-[1.5rem] font-medium">Registered: 17th May 2022</p>
            </div>

            <div className="px-[15px]">
                {/* Menu 1 */}
                <div className="mt-[30px]">
                    <h3 className="text-[1.8rem] leading-[144.444%] font-medium mb-[11px]">Manage Account</h3>
                    <ul>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={profile} alt="" />
                            <Link to="/profile">Personal info</Link>
                        </li>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={location} alt="" />
                            <Link to="/profile/addresses">Addresses</Link>
                        </li>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={message} alt="" />
                            <a href="#!">Communications & privacy</a>
                        </li>
                    </ul>
                </div>
                {/* Menu 2 */}
                <div className="mt-[30px]">
                    <h3 className="text-[1.8rem] leading-[144.444%] font-medium mb-[11px]">My items</h3>
                    <ul>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={dowload} alt="" />
                            <a href="#!">Reorder</a>
                        </li>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={heartprofile} alt="" />
                            <a href="#!">Lists</a>
                        </li>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={grif} alt="" />
                            <a href="#!">Registries</a>
                        </li>
                    </ul>
                </div>
                {/* Menu 3 */}
                <div className="mt-[30px]">
                    <h3 className="text-[1.8rem] leading-[144.444%] font-medium mb-[11px]">Subscriptions & plans</h3>
                    <ul>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={shield} alt="" />
                            <a href="#!">Protection plans</a>
                        </li>
                    </ul>
                </div>
                {/* Menu 4 */}
                <div className="mt-[30px]">
                    <h3 className="text-[1.8rem] leading-[144.444%] font-medium mb-[11px]">Customer Service</h3>
                    <ul>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={square} alt="" />
                            <a href="#!">Help</a>
                        </li>
                        <li className="flex items-center gap-[10px] py-[5px] leading-[146.667%] hover:opacity-55 transition-bg duration-500 ease-in-out">
                            <img src={danger} alt="" />
                            <a href="#!">Terms of Use</a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};
export default ProfileLeft;
