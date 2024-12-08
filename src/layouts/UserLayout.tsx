import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
// import Breadcrumbs from "@/components/Breadcrumbs";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { styled } from "@mui/material/styles";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useEffect } from "react";
import { OverlayProvider } from "@/contexts/Overlay";

const FixedLinearProgress = styled(LinearProgress)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const UserLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <div className="bg-[#F0F0F0]">
      <ScrollToTopButton />
      {loading && <FixedLinearProgress color="secondary" />}
      <OverlayProvider>
        <Header />
      </OverlayProvider>
      {/* <Breadcrumbs /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
