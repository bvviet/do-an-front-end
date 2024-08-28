import { Outlet } from "react-router-dom";
import Button from "../components/Button";
const UserLayout = () => {
    return (
        <div>
            <Button />
            <Outlet />
        </div>
    );
};
export default UserLayout;
