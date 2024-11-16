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
import Login from "@/pages/SignIn-Login/Login";
import SignUp from "@/pages/SignIn-Login/SignUp";
import ForgotPassword from "./pages/SignIn-Login/Forgot";
import Verify from "@/pages/SignIn-Login/Verify";
import SetPassword from "@/components/signIn-signUp/SetPassword";
import AdminLayout from "@/layouts/AdminLayout";
import ListAuth from "@/pages/admin/Auth/ListAuth";
import Statistical from "@/pages/admin/Statistical";

//import ListPrd from "./pages/admin/CRUD/ListProduct";
import LabTabs from "./components/admin/Tab";
import GenreTabs from "./components/admin/TabGenre";
// import CrudLayout from "@/layouts/CrudProduct";
// import ListProducts from "@/components/admin/CRUD/List";
// import AddProducts from "@/components/admin/CRUD/AddProduct";
import Register from "@/components/signIn-signUp/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import EditCategory from "./components/admin/CRUDGenre/EditGenre";
import FormAddAddress from "@/components/user/Profile/ProfileRight/FormAddAddress";
import CartPage from "./pages/user/Cart";
import CategoryProducts from "./pages/user/CategoryProducts";
import ListAdminOrders from "./pages/admin/AdminOrders/ListAdminOrders";
import OrderDetailAdmin from "./pages/admin/AdminOrders/OrderDetailAdmin";
import Orders from "./pages/user/Orders";
import OrderDetail from "./pages/user/OrderDetail";
import Thanks from "./pages/user/Thanks";
import Shipper from "./pages/admin/Shipper";
import ResultSearch from "./pages/user/ResultSearch";
import BrandTabs from "./components/admin/TabBrand";
import EditBrand from "./components/admin/CRUDBrand/UpdateBrand";
import Filter from "./pages/user/Filter";

function App() {
  const router = createBrowserRouter([
    {
      element: <UserLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/detail/:slug", element: <ProductDetail /> },
        { path: "/account", element: <Account /> },
        { path: "/contacts", element: <ContactUser /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blogDetail", element: <BlogDetail /> },
        { path: "/about", element: <About /> },
        { path: "/faq", element: <FAQs /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/login", element: <Login /> },
        { path: "/sign-up", element: <Register /> },
        { path: "/dangky", element: <SignUp /> },
        { path: "/forgot", element: <ForgotPassword /> },
        { path: "/otp", element: <Verify /> },
        { path: "/set-password", element: <SetPassword /> },
        { path: "/Cart", element: <CartPage /> },
        { path: "/payment/success", element: <Thanks /> },
        {
          path: "/categories/products/:categoriesChildId",
          element: <CategoryProducts />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/order/detail/:orderId",
          element: <OrderDetail />,
        },
        { path: "/search-result", element: <ResultSearch /> },
        { path: "/filter", element: <Filter /> },
        { path: "*", element: <NotFoundPage /> },
        {
          element: <ProtectedLayout />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
              children: [
                { index: true, element: <ProfileRight /> },
                { path: "addresses", element: <Address /> },
                { path: "addresses/add", element: <FormAddAddress /> },
                {
                  path: "addresses/update/:id",
                  element: <FormUpdateAddress />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "lists", element: <ListAuth /> },
        { path: "product", element: <LabTabs /> },
        { path: "genre", element: <GenreTabs /> },
        { path: "genre/:id", element: <EditCategory /> },
        { path: "brand", element: <BrandTabs /> },
        { path: "brand/:id", element: <EditBrand /> },
        { path: "orders", element: <ListAdminOrders /> },
        { path: "order/detail/:orderAdminId", element: <OrderDetailAdmin /> },
        { path: "statistical", element: <Statistical /> },
        { path: "shipper", element: <Shipper /> },

        // {
        //   path: "products",
        //   element: <CrudLayout />,
        //   children: [
        //     { path: "list", element: <ListProducts /> },
        //     { path: "add", element: <AddProducts /> },
        //     { path: "edit", element: <AddProducts /> },
        //   ],
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
