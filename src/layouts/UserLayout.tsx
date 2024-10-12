import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { styled } from "@mui/material/styles";

const FixedLinearProgress = styled(LinearProgress)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const UserLayout = () => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <div>
      {loading && <FixedLinearProgress color="secondary" />}
      <Header />
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
