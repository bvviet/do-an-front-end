import ProfileLeft from "@/components/user/Profile/ProfileLeft";
import { Outlet } from "react-router-dom";

const Profile = () => {
    return (
        <div className="container my-[30px]">
            <div className="grid grid-cols-12 gap-8">
                {/* Left */}
                <div className="col-span-12 md:col-span-4 lg:col-span-5 xl:col-span-3 bg-gray-200 rounded-xl">
                    <ProfileLeft />
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-7 xl:col-span-9 p-6 bg-gray-200 rounded-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default Profile;
