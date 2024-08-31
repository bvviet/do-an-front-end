import close from "../../../assets/icons/close.svg";

interface StickerAddFavoriteProps {
    showSticker: boolean;
    setShowSticker: (value: boolean) => void;
}

const StickerAddFavorite: React.FC<StickerAddFavoriteProps> = ({ showSticker, setShowSticker }) => {
    return (
        <div className="flex items-center bg-[#FFD44D] py-[15px] px-[35px]">
            <p className="text-[#131717] text-[18px] font-semibold">Added to Wish List</p>
            <a className="ml-auto hover:underline text-[#131717] text-[18px] font-semibold" href="#!">
                View
            </a>

            <div className="ml-[20px] cursor-pointer" onClick={() => setShowSticker(!showSticker)}>
                <img src={close} alt="close" />
            </div>
        </div>
    );
};

export default StickerAddFavorite;
