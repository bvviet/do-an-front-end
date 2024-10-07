import ProfileLeft from "@/components/user/Profile/ProfileLeft";
import { Link, Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Profile = () => {
  return (
    <div className="container my-[30px]">
      <div className="grid grid-cols-12 gap-8">
        {/* Left */}
        <div className="col-span-12 rounded-xl bg-gray-200 md:col-span-4 lg:col-span-5 xl:col-span-3">
          <ProfileLeft />
        </div>
        <div className="col-span-12 rounded-xl bg-gray-200 p-10 md:col-span-8 lg:col-span-7 xl:col-span-9">
          <Link to={"/profile"}>
            <ArrowBackIcon />
          </Link>
          <div className="lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
