import React, { useState, createContext, useContext, ReactNode } from "react";
import ClearIcon from "@mui/icons-material/Clear";

// Khai báo kiểu cho OverlayContext
interface OverlayContextType {
    openOverlay: (content: ReactNode) => void;
}

// Khởi tạo context với giá trị mặc định là undefined
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Sử dụng custom hook để lấy context
const useOverlayContext = () => {
    const context = useContext(OverlayContext);
    if (!context) {
        throw new Error("useOverlayContext must be used within an OverlayProvider");
    }
    return context;
};

interface OverlayProviderProps {
    children: ReactNode;
}

const OverlayProvider: React.FC<OverlayProviderProps> = ({ children }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openOverlay = (overlayContent: ReactNode) => {
        setShowMenu(true);
        setContent(overlayContent);
    };

    return (
        <OverlayContext.Provider value={{ openOverlay }}>
            {children}

            {showMenu && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setShowMenu(false)} />}

            {/* Menu */}
            <div
                className={`fixed top-0 left-0 w-[75%] h-full bg-[#005D63] transform transition-transform duration-300 ${
                    showMenu ? "translate-x-0" : "-translate-x-full"
                } z-20`}
            >
                <div onClick={() => setShowMenu(!showMenu)} className="text-white absolute z-10 right-[33px] top-[36px]">
                    <ClearIcon fontSize="large" />
                </div>
                <div className="text-white">{content}</div>
            </div>
        </OverlayContext.Provider>
    );
};

export { OverlayProvider, useOverlayContext };
