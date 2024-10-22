import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context
const TabContext = createContext<{ value: string; setValue: (value: string) => void } | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Khôi phục giá trị tab từ localStorage nếu có, ngược lại sử dụng "1"
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem("activeTab");
        return storedValue ? storedValue : "1"; // Giá trị mặc định là "1"
    });

    // Lưu giá trị tab vào localStorage khi nó thay đổi
    useEffect(() => {
        localStorage.setItem("activeTab", value);
    }, [value]);

    return (
        <TabContext.Provider value={{ value, setValue }}>
            {children}
        </TabContext.Provider>
    );
};

// Custom hook để sử dụng TabContext
export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabContext phải được sử dụng trong TabProvider");
    }
    return context;
};
