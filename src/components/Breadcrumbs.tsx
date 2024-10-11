import { Link, useLocation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const formatBreadcrumbName = (crumb: string) => {
  // Loại bỏ tham số và định dạng tên
  return crumb
    .split(":")[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumbs = () => {
  const location = useLocation();
  console.log({ location });

  const breadcrumbs = location.pathname.split("/").filter((path) => path);

  return (
    <nav
      aria-label="breadcrumb"
      className={`container ${location.pathname === "/" ? "hidden" : ""}`}
    >
      <ol className="my-[30px] flex items-center gap-2 rounded-2xl bg-[#F6F6F6] p-[20px] text-[1.7rem] font-medium">
        <li className={`text-[#9E9DA8] hover:underline`}>
          <Link to="/">Home</Link>
        </li>
        <ArrowForwardIosIcon fontSize="small" color="action" />
        {breadcrumbs.map((crumb, index) => {
          const path = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
          const formattedCrumb = formatBreadcrumbName(crumb); // Định dạng breadcrumb

          return (
            <div key={path} className="flex items-center">
              {index > 0 && (
                <ArrowForwardIosIcon fontSize="small" color="action" />
              )}
              <li
                className={`${location.pathname === path ? "text-[#1A162E]" : "text-[#9E9DA8]"} hover:underline`}
              >
                <Link to={path}>{formattedCrumb}</Link>
              </li>
            </div>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
