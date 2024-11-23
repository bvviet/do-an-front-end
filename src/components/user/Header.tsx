import { useEffect, useState } from "react";
import Logo from "../Logo";
import heartIcon from "../../assets/icons/heart.svg";
import cartIcon from "../../assets/icons/cart.svg";
import Navbar from "./Navbar";
import Search from "./Search";
import menu from "../../assets/icons/menu.svg";

import { useOverlayContext } from "../../contexts/Overlay";
import { Link } from "react-router-dom";
import { Avatar, Badge, IconButton, Menu, Tooltip } from "@mui/material";
import { useLogout } from "@/hooks/useLogOut";
import { useUserInfor } from "@/hooks/useUserInfor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | SVGSVGElement | null>(
    null,
  );
  const { openOverlay } = useOverlayContext();
  console.log({ openOverlay });

  const { logOut } = useLogout();
  const userInfor = useUserInfor();

  const handleUserProfileClick = (
    event: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setAnchorEl(null);
  }, [userInfor]);

  const cartItems = useSelector(
    (state: RootState) => state.carts.cart_items || [],
  );
  const favorite = useSelector((state: RootState) => state.favorite.items);

  const renderMenu = (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div className="w-[230px] px-[24px] py-[8px] text-[#666] shadow-[0_-4px_32px_rgba(0,0,0,0.3)] transition duration-700 ease-in-out">
        <ul className="">
          <a href="#!" className="flex items-center gap-[20px]">
            <div>
              <Avatar>N</Avatar>
              <span className="text-[1.6rem] font-semibold text-[#292929]">
                {userInfor?.name}
              </span>
              <div>#{userInfor?.id}</div>
            </div>
          </a>
          <div className="my-[8px] h-[1px] w-full" />
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
          <div className="my-[8px] h-[1px] w-full" />
          <ul>
            <li>
              <a
                href="/orders"
                className="block py-[10px] font-medium hover:text-[#444]"
              >
                Đơn hàng đã mua
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
              <Link
                to="/admin"
                className="block py-[10px] font-medium hover:text-[#444]"
              >
                Trang Admin
              </Link>
            </li>
            <li>
              <a
                href="#!"
                className="block py-[10px] font-medium hover:text-[#444]"
                onClick={() => logOut()}
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </Menu>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#A6AEBF] py-[20px] text-[#1A1A1D] sm:py-[28px]">
      <div className="container">
        {/* Desktop */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* Search Desktop */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/* Action */}
          {userInfor ? (
            <div className="flex gap-4 sm:gap-[18px]">
              <Tooltip title="Sản phẩm yêu thích" arrow>
                <Link to={"/favorites"} className="flex items-center gap-1">
                  <Badge
                    badgeContent={(favorite || []).length}
                    color="secondary"
                  >
                    <img src={heartIcon} alt="Favorites" />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip title="Giỏ hàng" arrow>
                <Link to={"/cart"} className="flex items-center gap-1">
                  <Badge badgeContent={cartItems.length || 0} color="secondary">
                    <img src={cartIcon} alt="Cart" />
                  </Badge>
                </Link>
              </Tooltip>
              <Tooltip title="Trang cá nhân" arrow>
                <IconButton>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    fontSize="large"
                    onClick={handleUserProfileClick}
                    component="svg"
                  />
                </IconButton>
              </Tooltip>
              {renderMenu}
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link to={"/sign-up"} className="font-bold">
                Đăng kí
              </Link>
              <Link
                to={"/login"}
                className="rounded-[99px] bg-gradient-to-r from-[#71b592] to-[#42b6d6] px-[20px] py-[9px]"
              >
                Đăng Nhập
              </Link>
            </div>
          )}
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
          {/* Search */}
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
