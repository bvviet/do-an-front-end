import Logo from "@/components/Logo";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
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

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const arrayNav = [
  {
    id: 1,
    name: "Người dùng",
    icon: AccountBoxIcon,
    link: "/admin/lists",
  },
  {
    id: 2,
    name: "Sản phẩm",
    icon: AccountBoxIcon,
    link: "/admin",
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

  return (
    <div className="flex h-screen flex-col rounded-r-lg bg-main p-7 text-white">
      {/* Logo */}
      <div>
        <Logo />
      </div>

      {/* Menu */}
      <div className="mt-6 flex-grow">
        <span className="mt-9 font-bold text-slate-400">Menu</span>
        <ul className="mt-[20px] flex flex-col gap-[20px] p-6">
          {arrayNav.map((nav) => (
            <Link to={nav.link}>
              <li
                className=""
                key={nav.id}
                onClick={() => setActiveNavbar(nav.id)}
              >
                <div
                  className={`${
                    activeNavbar === nav.id
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
      <div className="mt-auto">
        <Box sx={{ flexGrow: 0 }}>
          <div className="flex items-center gap-5">
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1636041282783-e218bb0a217b?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </IconButton>

            <div>
              <Typography>Bàn Văn Việt</Typography>
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                Admin
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default NavbarAdmin;
