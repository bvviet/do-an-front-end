import { createContext, useContext, useState, ReactNode } from "react";
import SimpleDialog from "./SimpleDialog"; // Đảm bảo đường dẫn chính xác đến SimpleDialog

interface ModalContextProps {
    openPopup: (content: ReactNode) => void;
    closePopup: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isShowing, setIsShowing] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openPopup = (content: ReactNode) => {
        setIsShowing(true);
        setContent(content);
    };

    const closePopup = () => {
        setIsShowing(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openPopup, closePopup }}>
            {children}
            <SimpleDialog open={isShowing} onClose={closePopup} selectedValue="" content={content} />
        </ModalContext.Provider>
    );
};

export default ModalProvider;
