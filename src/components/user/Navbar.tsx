/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode, useRef, useEffect } from "react";
import dropDownIcon from "../../assets/icons/dropdown.svg";
import dropDownActiveIcon from "../../assets/icons/dropdownActive.svg";
import shopIcon from "../../assets/icons/cart.svg";
import { useGetAllCategoriesQuery } from "@/services/authApi";
import { Link } from "react-router-dom";

interface MenuItemProps {
  label: string;
  children?: ReactNode;
}

const Navbar: React.FC = () => {
  const { data: category } = useGetAllCategoriesQuery();

  return (
    <div className="mt-[28px] flex-wrap px-8 sm:px-0 lg:flex">
      {category?.categories?.map(
        (item: {
          id: React.Key | null | undefined;
          name: string;
          children: {
            name:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }[];
        }) => (
          <MenuItem key={item.id} label={item.name}>
            <div className="w-[210px]">
              <ul className="">
                {/* Check if there are children (subcategories) */}
                {item.children?.map(
                  (
                    subItem: {
                      [x: string]: any;
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-4 px-[24px] py-[8px]">
                        <img
                          src={shopIcon}
                          alt=""
                          className="w-[15px] sm:w-[20px]"
                        />
                        <li className="leading-[175%] text-white hover:text-[#FFD44D]">
                          <Link
                            className="text-[1.4rem] font-normal sm:text-[1.6rem]"
                            to={`/categories/products/${subItem.id}`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      </div>
                      <hr className="opacity-30" />
                    </React.Fragment>
                  ),
                )}
              </ul>
            </div>
          </MenuItem>
        ),
      )}
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setOpen(!open);

  // Handle click outside the menu
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
    <div
      ref={menuRef}
      onClick={handleClick}
      style={{ position: "relative", padding: "10px", cursor: "pointer" }}
    >
      <div
        className={`flex items-center gap-[6px] ${open ? "text-[#FFD44D]" : ""}`}
      >
        {label}
        {open ? (
          <img
            src={dropDownActiveIcon}
            alt="Dropdown Active"
            className="filter-[#FFD44D]"
          />
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
