import add from "@/assets/icons/add.svg";
import flight from "@/assets/icons/IconProfiles/flight.svg";
import flightSmall from "@/assets/icons/IconProfiles/flightSmall.svg";
import oval from "@/assets/icons/IconProfiles/Oval.svg";
import la from "@/assets/icons/IconProfiles/la.svg";
import laBig from "@/assets/icons/IconProfiles/laBig.svg";
import messages from "@/assets/icons/message.svg";
import phone from "@/assets/icons/IconProfiles/phone.svg";
import location from "@/assets/icons/location.svg";
import { Link } from "react-router-dom";
import { useUserInfor } from "@/hooks/useUserInfor";

const ProfileRight = () => {
  const userInfor = useUserInfor();

  const uerInfoDefault = userInfor?.addresses.find(
    (add) => add.is_default === true,
  );
  console.log({ uerInfoDefault });

  return (
    <div className="flex flex-col gap-[30px]">
      {/* My wallet */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h2 className="text-[24px] font-bold leading-tight">My Wallet</h2>
          <p className="text-[15px]">Payment methods</p>
        </div>
        <div className="col-span-12 mt-[16px] grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* item 1 */}
          <div className="">
            <article className="relative rounded-[10px] bg-[#1E2E69] p-[20px]">
              <img src={flight} alt="" className="absolute right-0 top-0" />
              <div className="flex gap-[6px]">
                <img src={flightSmall} alt="" />
                <span className="font-medium text-white">FeatherCard</span>
              </div>
              <div className="mb-[20px] mt-[37px] text-[1.8rem] font-medium text-white">
                1234 4567 8901 2221
              </div>
              <div className="flex items-center justify-between text-white">
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
            <article className="relative rounded-[10px] bg-[#354151] p-[20px]">
              <img src={laBig} alt="" className="absolute right-0 top-0" />
              <div className="flex gap-[6px]">
                <img src={la} alt="" />
                <span className="font-medium text-white">FeatherCard</span>
              </div>
              <div className="z-2 relative mb-[20px] mt-[37px] text-[1.8rem] font-medium text-white">
                1234 4567 8901 2221
              </div>
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-[0.8rem]">Card Holder</p>
                  <p className="text-[1rem] font-medium">Imran Khan</p>
                </div>
                <div className="">
                  <p className="text-[0.8rem]">Card Holder</p>
                  <p className="text-[1rem] font-medium">Imran Khan</p>
                </div>
                <div className="">
                  <img src={oval} alt="" className="z-2 relative" />
                </div>
              </div>
            </article>
          </div>
          {/* item 3 */}
          <div className="">
            <a
              href="#!"
              className="flex h-full min-h-[170px] w-full flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d2d1d6]"
            >
              <img src={add} alt="" />
              <p className="mt-[14px] font-medium text-[#D2D1D6]">
                Add New Card
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Account info */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <h2 className="text-[24px] font-bold leading-tight">
            Basic information
          </h2>
          <p className="text-[15px]">
            Addresses, contact information and password
          </p>
        </div>
        <div className="col-span-12 mt-[16px] grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* item 1 */}
          <Link to="/profile/update">
            <article className="flex items-center gap-[10px] rounded-[10px] bg-[#f1f1f1] p-[10px]">
              <div className="flex flex-shrink-0 justify-center rounded-lg bg-white p-[15px]">
                <img src={messages} alt="" />
              </div>
              <div>
                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">
                  Email Address
                </h3>
                <p>{userInfor?.email}</p>
              </div>
            </article>
          </Link>
          {/* item 2 */}
          <Link to="/profile/update">
            <article className="flex items-center gap-[10px] rounded-[10px] bg-[#f1f1f1] p-[10px]">
              <div className="flex flex-shrink-0 justify-center rounded-lg bg-white p-[15px]">
                <img src={phone} alt="" />
              </div>
              <div>
                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">
                  Phone number
                </h3>
                <p>
                  {uerInfoDefault?.phone_number
                    ? uerInfoDefault.phone_number
                    : "Số điện thoại chưa được thêm"}
                </p>
              </div>
            </article>
          </Link>
          {/* item 3 */}
        </div>
      </div>
      <Link to="/profile/addresses">
        <article className="flex items-center gap-[10px] rounded-[10px] bg-[#f1f1f1] p-[10px]">
          <div className="flex flex-shrink-0 justify-center rounded-lg bg-white p-[15px]">
            <img src={location} alt="" />
          </div>
          <div className="w-full">
            <h3 className="text-[1.5rem] font-medium text-[#1A162E]">
              Add an address
            </h3>
            <p className="">
              {uerInfoDefault?.is_default === true ? (
                <>
                  {uerInfoDefault?.detail_address}, {uerInfoDefault?.Ward},{" "}
                  {uerInfoDefault?.district}, {uerInfoDefault?.city}
                </>
              ) : (
                "Địa chỉ chưa được thêm"
              )}
            </p>
          </div>
        </article>
      </Link>

      {/* Account info */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <h2 className="text-[24px] font-bold leading-tight">
            Social network information
          </h2>
          <p className="text-[15px]">
            Manage links to your social media sites.
          </p>
        </div>
        <div className="col-span-12 mt-[16px] grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* item 1 */}
          <Link to="/profile/update">
            <article className="flex items-center gap-[10px] rounded-[10px] bg-[#f1f1f1] p-[10px]">
              <div className="flex flex-shrink-0 justify-center rounded-lg bg-white p-[15px]">
                <img src={location} alt="" />
              </div>
              <div>
                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">
                  Facebook
                </h3>
                <p>
                  {userInfor?.link_fb
                    ? userInfor?.link_fb
                    : "Facebook not available"}
                </p>
              </div>
            </article>
          </Link>
          {/* item 2 */}
          <Link to="/profile/update">
            <article className="flex items-center gap-[10px] rounded-[10px] bg-[#f1f1f1] p-[10px]">
              <div className="flex flex-shrink-0 justify-center rounded-lg bg-white p-[15px]">
                <img src={location} alt="" />
              </div>
              <div>
                <h3 className="text-[1.5rem] font-medium text-[#1A162E]">
                  TikTok
                </h3>
                <p>
                  {userInfor?.link_tt
                    ? userInfor?.link_tt
                    : "Tiktok not available"}
                </p>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileRight;
