import { useEffect, useRef, useState } from "react";
// Tippy
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import searchIcon from "../../assets/icons/search.png";
import loadingIcon from "../../assets/icons/search/loading.png";
import close from "../../assets/icons/search/closed.png";

interface ResultItem {
  id: number;
  name: string;
}

const Search = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState<ResultItem[] | null>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const tippyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setResult([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  }, []);

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

    // Optional: Add a listener to handle resize if needed
    window.addEventListener("resize", updateTippyWidth);

    return () => {
      window.removeEventListener("resize", updateTippyWidth);
    };
  }, [valueInput, isActive]);

  console.log(searchRef.current?.value.length);

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
          <div className="absolute right-[5%] top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform">
            <img
              src={loadingIcon}
              alt="Loading Icon"
              className="h-full w-full animate-spin"
            />
          </div>

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

      {(result?.length || 0) > 0 && isActive && valueInput && (
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
                  <a href="#!">Xem tất cả 318 sản phẩm</a>
                </div>
                <div className="flex flex-col gap-6 p-5 lg:p-9">
                  {/* Item */}
                  <div className="flex gap-[15px]">
                    <div className="h-[90px] w-[90px]">
                      <a href="#!">
                        <img
                          className="h-full w-full object-contain"
                          src="https://product.hstatic.net/1000253775/product/160_ao_ba_lo_030-11_f34a2b89f1df47bbb748d92efe5e6e9a_compact.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#!" className="hover:opacity-50">
                        Áo Tanktop ICONDENIM Sleeveless
                      </a>
                      <p className="mt-2 text-[#ee4a4a]">190,000₫</p>
                    </div>
                  </div>
                  {/* Item */}
                  <div className="flex gap-[15px]">
                    <div className="h-[90px] w-[90px]">
                      <a href="#!">
                        <img
                          className="h-full w-full object-contain"
                          src="https://product.hstatic.net/1000253775/product/160_ao_ba_lo_030-11_f34a2b89f1df47bbb748d92efe5e6e9a_compact.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="#!" className="hover:opacity-50">
                        Áo Tanktop ICONDENIM Sleeveless
                      </a>
                      <p className="mt-2 text-[#ee4a4a]">190,000₫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        >
          <div className="" />
        </Tippy>
      )}
    </div>
  );
};

export default Search;
