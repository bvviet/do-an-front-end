import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.scss";
import UserLayout from "./layouts/UserLayout";

function App() {
    const router = createBrowserRouter([
        {
            element: <UserLayout />,
            children: [
                {
                    path: "/",
                    element: <div>p</div>,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
