/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-white": "#ffffff",
                "custom-dark": "#1e293b", // màu tối
                "custom-indigo": "#4f46e5", // màu indigo
                "custom-gray": "#000", // màu xám sáng
                "custom-dark-gray": "#374151", // màu xám tối
            },
        },
    },
    plugins: [],
};
