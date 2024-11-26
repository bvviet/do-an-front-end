import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.access_token,
  );
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
