import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.scss";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/HomePage";
import SignIn from "./components/signIn-signUp/signIn";
import SignUp from "./components/signIn-signUp/signUp";
import NotFoundPage from "./components/404/404";

function App() {
    const router = createBrowserRouter([
        {
            element: <UserLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/login",
                    element: <SignIn />,
                },
                {
                    path: "/signup",
                    element: <SignUp />,
                },
                {
                    path: "/404",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
