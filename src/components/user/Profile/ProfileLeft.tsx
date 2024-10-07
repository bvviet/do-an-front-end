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
import { useUserInfor } from "@/hooks/useUserInfor";
import useDateFormatter from "@/hooks/useDateFormatter";

const ProfileLeft = () => {
  const userInfor = useUserInfor();
  const { formatDate } = useDateFormatter();

  const urlImage = userInfor?.avatar
    ? `http://127.0.0.1:8000/storage/${userInfor.avatar}`
    : "default-avatar-path.jpg";
  return (
    <aside>
      {/* User */}
      <div className="flex w-full flex-col items-center rounded-t-2xl bg-[url('https://sondnpt00343.github.io/f8-project-08/assets/img/profile/cover.png')] bg-cover bg-center bg-no-repeat p-4 px-[20px] pb-[20px] pt-[40px] text-white">
        <AvatarComponent width="110" height="110" urlImage={urlImage} />
        <h1 className="mt-[20px] text-[1.8rem] font-bold">{userInfor?.name}</h1>
        <p className="text-[1.5rem] font-medium">
          Registered: {formatDate(userInfor?.created_at)}
        </p>
      </div>

      <div className="px-[15px]">
        {/* Menu 1 */}
        <div className="mt-[30px]">
          <h3 className="mb-[11px] text-[1.8rem] font-medium leading-[144.444%]">
            Manage Account
          </h3>
          <img
            src={`http://127.0.0.1:8000/storage/${userInfor?.avatar}`}
            alt="User Avatar"
          />

          <ul>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={profile} alt="" />
              <Link to="/profile">Personal info</Link>
            </li>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={location} alt="" />
              <Link to="/profile/addresses">Addresses</Link>
            </li>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={message} alt="" />
              <a href="#!">Communications & privacy</a>
            </li>
          </ul>
        </div>
        {/* Menu 2 */}
        <div className="mt-[30px]">
          <h3 className="mb-[11px] text-[1.8rem] font-medium leading-[144.444%]">
            My items
          </h3>
          <ul>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={dowload} alt="" />
              <a href="#!">Reorder</a>
            </li>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={heartprofile} alt="" />
              <a href="#!">Lists</a>
            </li>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={grif} alt="" />
              <a href="#!">Registries</a>
            </li>
          </ul>
        </div>
        {/* Menu 3 */}
        <div className="mt-[30px]">
          <h3 className="mb-[11px] text-[1.8rem] font-medium leading-[144.444%]">
            Subscriptions & plans
          </h3>
          <ul>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={shield} alt="" />
              <a href="#!">Protection plans</a>
            </li>
          </ul>
        </div>
        {/* Menu 4 */}
        <div className="mt-[30px]">
          <h3 className="mb-[11px] text-[1.8rem] font-medium leading-[144.444%]">
            Customer Service
          </h3>
          <ul>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
              <img src={square} alt="" />
              <a href="#!">Help</a>
            </li>
            <li className="transition-bg flex items-center gap-[10px] py-[5px] leading-[146.667%] duration-500 ease-in-out hover:opacity-55">
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
