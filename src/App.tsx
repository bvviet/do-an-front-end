import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.scss";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/HomePage";

function App() {
    const router = createBrowserRouter([
        {
            element: <UserLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
