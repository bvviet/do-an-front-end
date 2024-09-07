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
    const tippyRef = useRef<HTMLInputElement | null>(null);
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

    console.log(valueInput);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        className="border border-white p-[9px] w-[200px] sm:w-[300px] lg:w-[799px] rounded-l-lg"
                    />
                    <div className="w-[16px] h-[16px] absolute right-[5%] top-1/2 transform -translate-y-1/2">
                        <img src={loadingIcon} alt="Loading Icon" className="w-full h-full animate-spin" />
                    </div>

                    {(valueInput?.length || 0) > 0 && (
                        <div
                            className="w-[16px] h-[16px] absolute right-[5%] top-1/2 transform -translate-y-1/2 cursor-pointer"
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
                    placement="bottom-start" // You can adjust this value
                    render={(attrs) => (
                        <div
                            ref={tippyRef}
                            className="bg-gray-800 text-white p-4 rounded-lg shadow-lg"
                            tabIndex={-1}
                            {...attrs}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio et alias laborum
                            explicabo necessitatibus itaque sequi error vel obcaecati! Asperiores ducimus aliquam,
                            excepturi laborum esse nesciunt non doloribus dolores, porro ea recusandae facilis itaque
                            officia dignissimos dolore. Placeat nostrum recusandae reprehenderit quo perspiciatis illum
                            asperiores, dolorum facilis. Voluptatem commodi cupiditate eius quidem facilis id
                            dignissimos non obcaecati dolorum, maxime vero doloribus. Quis odio iusto accusantium
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
