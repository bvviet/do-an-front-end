import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink từ react-router-dom

const HeaderCrud = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});

  // Thay đổi kiểu từ HTMLDivElement[] thành HTMLAnchorElement[]
  const menuRefs = useRef<HTMLAnchorElement[]>([]);

  // Các mục menu cùng với các đường dẫn tương ứng
  const menuItems = [
    { name: "List Product", path: "/admin/products/list" },
    { name: "Add Product", path: "/admin/products/add" },
  ];

  // Cập nhật vị trí và kích thước của đường border-bottom
  const updateUnderline = (index: number) => {
    const currentItem = menuRefs.current[index];
    if (currentItem) {
      const { offsetLeft, offsetWidth } = currentItem;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  };

  useEffect(() => {
    // Thiết lập đường underline khi component render lần đầu
    updateUnderline(activeIndex);
  }, [activeIndex]);

  return (
    <div className="relative mb-10 mt-6 rounded-3xl bg-white py-8">
      <div className="flex space-x-12 text-lg font-medium">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path} // Điều hướng tới đường dẫn tương ứng
            key={index}
            ref={(el) => (menuRefs.current[index] = el!)}
            onClick={() => setActiveIndex(index)}
            className={`ml-4 cursor-pointer px-6 font-manrope text-[20px] font-semibold ${activeIndex === index ? "text-blue-500" : ""}`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div
        className="absolute top-0 h-[2px] bg-blue-500 transition-all duration-300"
        style={underlineStyle}
      />
    </div>
  );
};

export default HeaderCrud;
