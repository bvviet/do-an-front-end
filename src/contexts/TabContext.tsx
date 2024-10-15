import React, { createContext, useContext, useState } from "react";

// Tạo context
const TabContext = createContext<{ value: string; setValue: (value: string) => void } | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [value, setValue] = useState("1");
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
