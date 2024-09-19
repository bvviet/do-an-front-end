import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.scss";
import UserLayout from "@/layouts/UserLayout";
import NotFoundPage from "@/components/404/404";
import ContactUser from "@/pages/user/Contact";
import Blog from "@/pages/user/Blog/Blog";
import BlogDetail from "@/pages/user/Blog/BlogDetail";
import ProductDetail from "@/pages/user/ProductDetail";
import About from "@/pages/user/About";
import Profile from "@/pages/user/Profile";
import FAQs from "@/pages/user/FAQ/FAQ";
import Account from "@/pages/user/Account";
import Address from "@/components/user/Profile/ProfileRight/Address";
import FormUpdateAddress from "@/components/user/Profile/ProfileRight/FormUpdateAddress";
import CheckOut from "@/pages/user/CheckOut/CheckOut";
import HomePage from "@/pages/user/Home/HomePage";
import ProfileRight from "@/components/user/Profile/ProfileRight";
import Login from "./pages/SignIn-Login/Login";
import SignUp from "./pages/SignIn-Login/SignUp";
import ForgotPassword from "./pages/SignIn-Login/Forgot";
import Verify from "./pages/SignIn-Login/Verify";
import SetPassword from "./components/signIn-signUp/SetPassword";
import AdminLayout from "./layouts/AdminLayout";
import ListAuth from "./pages/admin/Auth/ListAuth";

function App() {
  const router = createBrowserRouter([
    {
      element: <UserLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/detail", element: <ProductDetail /> },
        { path: "/account", element: <Account /> },
        { path: "/contacts", element: <ContactUser /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blogDetail", element: <BlogDetail /> },
        { path: "/about", element: <About /> },
        { path: "/faq", element: <FAQs /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/forgot", element: <ForgotPassword /> },
        { path: "/otp", element: <Verify /> },
        { path: "/setpassword", element: <SetPassword /> },
        { path: "*", element: <NotFoundPage /> },
        {
          path: "/profile",
          element: <Profile />,
          children: [
            { index: true, element: <ProfileRight /> },
            { path: "addresses", element: <Address /> },
            { path: "addresses/add", element: <FormUpdateAddress /> },
            // { path: "addresses/add", element: <FormUpdateAddress /> },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        // Admin routes here
        { path: "lists", element: <ListAuth /> },
        // { path: "/admin/products", element: <Products /> },
        // { path: "/admin/orders", element: <Orders /> },
        // { path: "/admin/users", element: <Users /> },
        // { path: "/admin/categories", element: <Categories /> },
        // { path: "/admin/settings", element: <Settings /> },
        // { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
