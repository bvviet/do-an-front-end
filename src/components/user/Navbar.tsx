import React, { useState, ReactNode, useRef, useEffect } from "react";
import dropDownIcon from "../../assets/icons/dropdown.svg";
import dropDownActiveIcon from "../../assets/icons/dropdownActive.svg";
import shopIcon from "../../assets/icons/cart.svg";

interface MenuItemProps {
    label: string;
    children?: ReactNode;
}

const items = [
    { id: "1", name: "Home" },
    { id: "2", name: "Category" },
    { id: "3", name: "Brand" },
    { id: "4", name: "Products" },
    { id: "5", name: "About Us" },
    { id: "6", name: "Contact Us" },
    { id: "7", name: "Shop" },
    { id: "8", name: "Pages" },
];

const Navbar: React.FC = () => {
    return (
        <div className="lg:flex mt-[28px] px-8 sm:px-0">
            {items.map((item) => (
                <MenuItem key={item.id} label={item.name}>
                    <div className="w-[210px]">
                        <ul className="">
                            {/* Các item menu con */}
                            {["San pham 1", "San pham 2", "San pham 3", "San pham 4"].map((subItem, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex gap-4 items-center px-[24px] py-[8px]">
                                        <img src={shopIcon} alt="" className="w-[15px] sm:w-[20px]" />
                                        <li className="hover:text-[#FFD44D] text-white leading-[175%]">
                                            <a className="font-normal text-[1.4rem] sm:text-[1.6rem]" href="">
                                                {subItem}
                                            </a>
                                        </li>
                                    </div>
                                    <hr className="opacity-30" />
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </MenuItem>
            ))}
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => setOpen(!open);

    // Hàm xử lý khi click bên ngoài menu
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} onClick={handleClick} style={{ position: "relative", padding: "10px", cursor: "pointer" }}>
            <div className={`flex gap-[6px] items-center ${open ? "text-[#FFD44D]" : ""}`}>
                {label}
                {open ? (
                    <img src={dropDownActiveIcon} alt="Dropdown Active" className="filter-[#FFD44D]" />
                ) : (
                    <img src={dropDownIcon} alt="Dropdown" className="filter-[#FFD44D]" />
                )}
            </div>
            <div
                className={`menu-content top-[100%] sm:top-[164%] ${open ? "open" : ""}`}
                style={{
                    color: "#000",
                    position: "absolute",
                    left: "0",
                    backgroundColor: "#005D63",
                    boxShadow: "0px 12px 34px 0px rgba(0, 87, 78, 0.05)",
                    zIndex: 10,
                    borderRadius: "2px",
                    maxHeight: open ? "400px" : "0",
                    opacity: open ? "1" : "0",
                    visibility: open ? "visible" : "hidden",
                    overflow: "hidden",
                    transition: "all 0.7s ease",
                    border: "1px solid #45868c",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Navbar;
