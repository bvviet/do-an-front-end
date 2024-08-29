import searchIcon from "../../assets/icons/search.png";

const Search = () => {
    return (
        <div>
            <form action="" className="flex">
                <input
                    type="text"
                    placeholder="Search for anything"
                    className="border border-white p-[9px] w-[170px] lg:w-[799px]"
                />
                <button type="submit">
                    <img src={searchIcon} alt="" />
                </button>
            </form>
        </div>
    );
};
export default Search;
