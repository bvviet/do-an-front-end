import Logo from "../Logo";
import userIcon from "../../assets/icons/user.svg";
import heartIcon from "../../assets/icons/heart.svg";
import cartIcon from "../../assets/icons/cart.svg";
import Navbar from "./Navbar";
import Search from "./Search";
import menu from "../../assets/icons/menu.svg";
import { useState } from "react";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="bg-[#005D63] text-white py-[20px] sm:py-[28px]">
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
                    <div className="flex gap-4 sm:gap-[18px]">
                        <img src={userIcon} alt="User" />
                        <div className="flex gap-1">
                            <img src={heartIcon} alt="Favorites" />
                            <span>(0)</span>
                        </div>
                        <div className="flex gap-1">
                            <img src={cartIcon} alt="Cart" />
                            <span>(0)</span>
                        </div>
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
                        <img 
                            src={menu} 
                            alt="Menu" 
                            className="cursor-pointer" 
                            onClick={() => setShowMenu(!showMenu)} 
                        />
                        <span className="text-[1.4rem]">Menu</span>
                    </div>
                    
                    {/* Overlay */}
                    {showMenu && (
                        <div 
                            className="fixed inset-0 bg-black opacity-50 z-10"
                            onClick={() => setShowMenu(false)}
                        />
                    )}

                    {/* Menu */}
                    <div
                        className={`fixed top-0 left-0 w-[75%] h-full bg-[#005D63] transform transition-transform duration-300 ${
                            showMenu ? "translate-x-0" : "-translate-x-full"
                        } z-20`}
                    >
                        <Navbar />
                    </div>

                    {/* Search */}
                    <Search />
                </div>
            </div>
        </header>
    );
};

export default Header;
