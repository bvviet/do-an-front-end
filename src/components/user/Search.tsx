import { useEffect, useRef, useState } from "react";
// Tippy
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import searchIcon from "../../assets/icons/search.png";
import loadingIcon from "../../assets/icons/search/loading.png";
import close from "../../assets/icons/search/closed.png";
import { useSearchProductQuery } from "@/services/productApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const tippyRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: dataSearch, isLoading } = useSearchProductQuery(valueInput);
  console.log({ dataSearch });

  const handleClickOutside = (e: MouseEvent) => {
    if (
      tippyRef.current &&
      !tippyRef.current.contains(e.target as Node) &&
      searchRef.current &&
      !searchRef.current.contains(e.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateTippyWidth = () => {
      if (searchRef.current && tippyRef.current) {
        requestAnimationFrame(() => {
          tippyRef.current!.style.width = `${searchRef.current!.offsetWidth}px`;
        });
      }
    };

    updateTippyWidth(); // Initial call to set width

    window.addEventListener("resize", updateTippyWidth);

    return () => {
      window.removeEventListener("resize", updateTippyWidth);
    };
  }, [valueInput, isActive]);

  // Lắng nghe thay đổi URL và ẩn kết quả tìm kiếm khi URL thay đổi
  useEffect(() => {
    setIsActive(false);
    setValueInput("");
  }, [location]);

  const handleSearchResultClick = () => {
    navigate("/search-result", {
      state: { results: dataSearch },
    });
  };

  return (
    <div className="relative">
      <form action="" className="flex items-center">
        <div className="relative">
          <input
            ref={searchRef}
            onChange={(e) => setValueInput(e.target.value)}
            onClick={() => {
              setIsActive(true);
            }}
            value={valueInput}
            type="text"
            placeholder="Search for anything"
            className="w-[200px] rounded-l-lg border border-white p-[9px] sm:w-[300px] lg:w-[799px]"
          />
          {isLoading && (
            <div className="absolute right-[5%] top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform">
              <img
                src={loadingIcon}
                alt="Loading Icon"
                className="h-full w-full animate-spin"
              />
            </div>
          )}

          {(valueInput?.length || 0) > 0 && (
            <div
              className="absolute right-[5%] top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform cursor-pointer"
              onClick={() => setValueInput("")}
            >
              <img src={close} alt="Close Icon" />
            </div>
          )}
        </div>

        <button type="submit">
          <img src={searchIcon} alt="Search Icon" className="rounded-r-lg" />
        </button>
      </form>

      {(dataSearch?.length || 0) > 0 && isActive && valueInput ? (
        <Tippy
          visible={true}
          interactive={true}
          placement="bottom-start"
          render={(attrs) => (
            <div
              ref={tippyRef}
              className="rounded-lg bg-[#2f6569] text-white shadow-lg"
              tabIndex={-1}
              {...attrs}
            >
              <div>
                <h2 className="mb-[10px] text-center text-[1.8rem] font-semibold">
                  Kết quả tìm kiếm
                </h2>
                <div className="mb-[10px] flex items-center justify-between bg-[#235c60] px-5 py-[5px] text-[1.5rem] font-semibold lg:px-9">
                  <p>Sản phẩm</p>
                  <a
                    onClick={handleSearchResultClick}
                    className="hover:text-[#ccc] cursor-pointer"
                  >
                    Xem tất cả {dataSearch?.length} sản phẩm
                  </a>
                </div>
                <div
                  className="flex flex-col gap-6 p-5 lg:p-9"
                  style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                  }}
                >
                  {/* Item */}
                  {dataSearch?.map((search) => (
                    <div className="flex gap-[15px]" key={search.id}>
                      <div>
                        <Link
                          to={`/detail/${search.slug}`}
                          className="relative block h-[90px] w-[90px]"
                        >
                          <img
                            className="h-full w-full transform rounded-md object-contain transition-transform duration-300 hover:scale-110"
                            src={search.img_thumbnail}
                            alt={search.name}
                          />
                        </Link>
                      </div>

                      <div>
                        <Link
                          to={`/detail/${search.slug}`}
                          className="hover:opacity-50"
                        >
                          {search.name}
                        </Link>
                        <p className="mt-2 text-[#ee4a4a]">
                          {formatCurrency(search.price_regular)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        >
          <div className="" />
        </Tippy>
      ) : isActive && valueInput ? (
        <div className="mt-4 text-center text-white">
          Không có kết quả tìm kiếm nào
        </div>
      ) : null}
    </div>
  );
};

export default Search;
