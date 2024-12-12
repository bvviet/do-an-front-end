import Logo from "@/components/Logo";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DiscountIcon from "@mui/icons-material/Discount";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublicIcon from "@mui/icons-material/Public";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "@/services/authApi";
import DomainIcon from "@mui/icons-material/Domain";

const settings = [
  { id: 1, name: "Ra trang người dùng", link: "/" },
  { id: 2, name: "Trang cá nhân", link: "/profile" },
];
const arrayNav = [
  {
    id: 1,
    name: "Dashboard",
    icon: DomainIcon,
    link: "/admin",
  },
  {
    id: 2,
    name: "Người dùng",
    icon: AccountBoxIcon,
    link: "/admin/lists",
  },
  {
    id: 3,
    name: "Sản phẩm",
    icon: ShoppingCartIcon,
    link: "/admin/product",
  },
  {
    id: 4,
    name: "Thương hiệu",
    icon: PublicIcon,
    link: "/admin/brand",
  },
  {
    id: 5,
    name: "Danh mục",
    icon: FormatListBulletedIcon,
    link: "/admin/genre",
  },
  {
    id: 6,
    name: "Quản lý đơn hàng",
    icon: ReceiptLongIcon,
    link: "/admin/orders",
  },
  {
    id: 7,
    name: "Shipper",
    icon: LocalShippingIcon,
    link: "/admin/shipper",
  },
  {
    id: 8,
    name: "Mã giảm giá",
    icon: DiscountIcon,
    link: "/admin/voucher",
  },
  {
    id: 9,
    name: "Thống kê",
    icon: BarChartIcon,
    link: "/admin/statistical",
  },
  {
    id: 10,
    name: "Banner",
    icon: BarChartIcon,
    link: "/admin/banners",
  },
];

const NavbarAdmin = () => {
  const [activeNavbar, setActiveNavbar] = useState<number>();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { data: user } = useGetUsersQuery();

  return (
    <div className="flex h-[100vh] flex-col overflow-y-auto rounded-r-lg bg-main p-7 text-[1.5rem] text-white">
      {/* Logo */}
      <div className="sticky top-0 left-0 ">
        <Logo />
      </div>

      {/* Menu */}
      <div className="mt-6 flex-grow">
        <ul className="mt-[20px] flex flex-col gap-[20px] p-6">
          {arrayNav.map((nav) => (
            <Link to={nav.link} key={nav.id}>
              <li
                className=""
                key={nav.id}
                onClick={() => setActiveNavbar(nav.id)}
              >
                <div
                  className={`${activeNavbar === nav.id
                    ? "rounded-[10px] bg-white text-main"
                    : "hover:opacity-70"
                    } flex w-full cursor-pointer gap-[10px] p-[10px] hover:rounded-[10px]`}
                >
                  <nav.icon />
                  <span>{nav.name}</span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Avatar - Căn dưới cùng */}
      <div className="sticky bottom-0 left-0 mt-auto bg-main p-4">
        <Box sx={{ flexGrow: 0 }}>
          <div className="flex items-center gap-5">
            <IconButton sx={{ p: 0 }}>
              <Avatar src={user?.avatar ?? ""}>
                {user?.name.slice(0, 1).toLocaleUpperCase()}
              </Avatar>
            </IconButton>

            <div>
              <Typography>{user?.name}</Typography>
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                {user?.role}
              </Typography>
            </div>
            <Tooltip title="Mở cài đặt">
              <div className="ml-auto" onClick={handleOpenUserMenu}>
                <IconButton>
                  <SettingsIcon sx={{ color: "#ccc" }} />
                </IconButton>
              </div>
            </Tooltip>
          </div>
          <Menu
            sx={{ mt: "0" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                <Link to={`${setting.link}`}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default NavbarAdmin;
