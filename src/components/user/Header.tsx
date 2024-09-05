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
import { Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

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
        <header className="bg-[#005D63] text-white py-[20px] sm:py-[28px]">
            <div className="container">
                {/* Desktop */}
                <div className="flex items-center justify-between relative">
                    {/* Logo */}
                    <Logo />
                    {/* Search Desktop */}
                    <div className="hidden lg:block">
                        <Search />
                    </div>
                    {/* Action */}
                    <div onClick={() => openPopup(<SignIn />)}>Login</div>
                    <div className="flex gap-4 sm:gap-[18px]">
                        <div className="flex items-center gap-1">
                            <img src={heartIcon} alt="Favorites" />
                            <span>(0)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={cartIcon} alt="Cart" />
                            <span>(0)</span>
                        </div>
                        <div
                            ref={IconUserRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowProfile(!showProfile);
                            }}
                            className="cursor-pointer"
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                sx={{ width: 35, height: 35 }}
                            />
                        </div>
                        {showProfile && (
                            <div
                                ref={profileRef}
                                className="absolute z-[9999] top-0 right-0 m-0 transform translate-x-[0] translate-y-[59.2308px]"
                            >
                                <ul className="w-[230px] py-[8px] px-[24px] shadow-[0_-4px_32px_rgba(0,0,0,0.3)] transition duration-700 ease-in-out bg-white text-[#666] rounded-[10px]">
                                    <a href="#!" className="flex items-center gap-[20px]">
                                        <div className="my-[8px]">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </div>
                                        <div>
                                            <span className="text-[1.6rem] text-[#292929] font-semibold">
                                                Bàn Văn Việt
                                            </span>
                                            <div>12345</div>
                                        </div>
                                    </a>
                                    <div className="my-[8px] w-full h-[1px] bg-[#0000000d]" />
                                    <ul>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block font-medium py-[10px] hover:text-[#444]"
                                            >
                                                Trang cá nhân
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="my-[8px] w-full h-[1px] bg-[#0000000d]" />
                                    <ul>
                                        <li>
                                            <a href="#!" className="block font-medium py-[10px] hover:text-[#444]">
                                                Viết blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="block font-medium py-[10px] hover:text-[#444]">
                                                Bài viết của tôi
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="block font-medium py-[10px] hover:text-[#444]">
                                                Bài viết đã lưu
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="my-[8px] w-full h-[1px] bg-[#0000000d]" />
                                    <ul>
                                        <li>
                                            <a href="#!" className="block font-medium py-[10px] hover:text-[#444]">
                                                Cài đặt
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="block font-medium py-[10px] hover:text-[#444]">
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
                <div className="relative flex items-center justify-between lg:hidden mt-[20px]">
                    {/* Icon menu */}
                    <div className="flex items-center gap-[5px]">
                        <img src={menu} alt="Menu" className="cursor-pointer" onClick={() => openOverlay(<Navbar />)} />
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
