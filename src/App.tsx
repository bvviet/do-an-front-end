import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.scss";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/Home/HomePage";
import NotFoundPage from "./components/404/404";
import Blog from "./pages/user/Blog";
import ContactUser from "./pages/user/Contact";

function App() {
    const router = createBrowserRouter([
        {
            element: <UserLayout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/contacts", element: <ContactUser /> },
                { path: "/blog", element: <Blog /> },
                { path: "*", element: <NotFoundPage /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
