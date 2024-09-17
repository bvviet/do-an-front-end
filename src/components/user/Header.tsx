import { useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import heartIcon from "../../assets/icons/heart.svg";
import cartIcon from "../../assets/icons/cart.svg";
import Navbar from "./Navbar";
import Search from "./Search";
import menu from "../../assets/icons/menu.svg";

import SignIn from "../signIn-signUp/signIn";
import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import { useOverlayContext } from "../../contexts/Overlay";
import { Link, useLocation } from "react-router-dom";
import AvatarComponent from "../Avatar";
import { Tooltip } from "@mui/material";

const Header = () => {
  const { openPopup } = useModalContext();
  const { openOverlay } = useOverlayContext();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  // Create refs for the profile overlay and user icon
  const profileRef = useRef<HTMLDivElement>(null);
  const IconUserRef = useRef<HTMLDivElement>(null);

  // Handle click outside the overlay to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        IconUserRef.current &&
        !IconUserRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowProfile(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-[#005D63] py-[20px] text-white sm:py-[28px]">
      <div className="container">
        {/* Desktop */}
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* Search Desktop */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* Action */}
          <div onClick={() => openPopup(<SignIn />)}>Login</div>
          <div className="flex gap-4 sm:gap-[18px]">
            <Tooltip title="Sản phẩm yêu thích" arrow>
              <Link to={"#!"} className="flex items-center gap-1">
                <img src={heartIcon} alt="Favorites" />
                <span>(0)</span>
              </Link>
            </Tooltip>
            <Tooltip title="Giỏ hàng" arrow>
              <Link to={"#!"} className="flex items-center gap-1">
                <img src={cartIcon} alt="Cart" />
                <span>(0)</span>
              </Link>
            </Tooltip>
            <Tooltip title="Trang cá nhân" arrow>
              <div
                ref={IconUserRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfile(!showProfile);
                }}
                className="cursor-pointer"
              >
                <AvatarComponent
                  width="33"
                  height="33"
                  urlImage="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
            </Tooltip>
            {showProfile && (
              <div
                ref={profileRef}
                className="absolute right-0 top-0 z-[9999] m-0 translate-x-[0] translate-y-[59.2308px] transform"
              >
                <ul className="w-[230px] rounded-[10px] bg-white px-[24px] py-[8px] text-[#666] shadow-[0_-4px_32px_rgba(0,0,0,0.3)] transition duration-700 ease-in-out">
                  <a href="#!" className="flex items-center gap-[20px]">
                    <div className="my-[8px]">
                      <AvatarComponent
                        width="50"
                        height="50"
                        urlImage="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </div>
                    <div>
                      <span className="text-[1.6rem] font-semibold text-[#292929]">
                        Bàn Văn Việt
                      </span>
                      <div>12345</div>
                    </div>
                  </a>
                  <div className="my-[8px] h-[1px] w-full bg-[#0000000d]" />
                  <ul>
                    <li>
                      <Link
                        to="/profile"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Trang cá nhân
                      </Link>
                    </li>
                  </ul>
                  <div className="my-[8px] h-[1px] w-full bg-[#0000000d]" />
                  <ul>
                    <li>
                      <a
                        href="#!"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Viết blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Bài viết của tôi
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Bài viết đã lưu
                      </a>
                    </li>
                  </ul>
                  <div className="my-[8px] h-[1px] w-full bg-[#0000000d]" />
                  <ul>
                    <li>
                      <a
                        href="#!"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Cài đặt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        className="block py-[10px] font-medium hover:text-[#444]"
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Navbar Desktop */}
        <div className="hidden lg:block">
          <Navbar />
        </div>

        {/* Mobile */}
        <div className="relative mt-[20px] flex items-center justify-between lg:hidden">
          {/* Icon menu */}
          <div className="flex items-center gap-[5px]">
            <img
              src={menu}
              alt="Menu"
              className="cursor-pointer"
              onClick={() => openOverlay(<Navbar />)}
            />
            <span className="text-[1.4rem]">Menu</span>
          </div>

          {/* Overlay */}

          {/* Search */}
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
