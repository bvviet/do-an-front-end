import React, { useState, useRef, useEffect } from "react";

const HeaderCrud = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const menuRefs = useRef<HTMLDivElement[]>([]);

  const menuItems = ["List Product", "Add Product", "Update Products"];

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
    <div className="relative rounded-3xl mb-10 py-8 mt-6 bg-white">
      <div className="flex space-x-12 text-lg font-medium">
        {menuItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => (menuRefs.current[index] = el!)}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer ml-4 px-6 font-manrope text-[20px] font-semibold ${activeIndex === index ? "text-blue-500" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="absolute  top-0 h-[2px] bg-blue-500 transition-all duration-300"
        style={underlineStyle}
      />
    </div>
  );
};

export default HeaderCrud;
