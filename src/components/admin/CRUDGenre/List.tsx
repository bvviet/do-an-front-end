import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Typography,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkProducts from "./Components/Button";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { toast } from "react-toastify";
import { useDeleteCategoryMutation } from "@/services/authApi"; // Hook để thực hiện xóa danh mục
import { ICategory } from "@/types/genre"; // Kiểu dữ liệu cho danh mục
import { Link } from "react-router-dom";
import CFButton from "../CfButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";

interface Column {
  id: "name" | "id" | "action" | "image" | "slug" | "children";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Tên", minWidth: 170, align: "center" },
  //{ id: "image", label: "Ảnh", minWidth: 170, align: "center" },
  { id: "slug", label: "Slug", minWidth: 170, align: "center" },
  { id: "children", label: "Thể loại con", minWidth: 200, align: "center" },
  { id: "action", label: "Thao tác", minWidth: 170, align: "center" },
];

export default function ListCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { openPopup } = useModalContext();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [loading, setLoading] = React.useState(false);
  const [categoriesList, setCategory] = React.useState<ICategory[]>([]);
  const [allCategory, setAllCategory] = React.useState<ICategory[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  // const categoriesList: ICategory[] = Array.isArray(categories) ? categories : (categories as { categories: ICategory[] })?.categories || [];
  const token = useSelector((state: RootState) => state.auth.access_token);

  const fetchBrand = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề
          },
        },
      );
      setCategory(response.data.data.categories); // Lấy dữ liệu
      setAllCategory(response.data.data.categories);
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
      toast.error("Không thể tải danh sách voucher.");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchBrand();
  }, []);
  console.log("dấds", allCategory);

  // hàm tìm kiếm
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang
    if (searchTerm === "") {
      setCategory(allCategory);
    } else {
      const filteredCategory = allCategory.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()), // Tìm kiếm theo tên
      );
      setCategory(filteredCategory); // Cập nhật danh sách sản phẩm hiển thị
    }
  };
  // end hàm tìm kiếm

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Xoá thể loại thành công");
      window.location.reload();
    } catch (err) {
      const error = err as { status?: number; data?: { message?: string } };
      const errorMessage =
        error.data?.message || "Failed to delete category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to delete category:", error);
    }
  };

  if (loading) return <LinearProgress />;

  return (
    <Paper sx={{ width: "100%", borderRadius: "10px" }}>
      <TableContainer
        className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]"
        style={{ borderRadius: "10px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <form className="flex items-center" onSubmit={handleSearch}>
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <button
                      type="submit"
                      className="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <svg
                        className="h-9 w-9 text-gray-800 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="simple-search"
                      className="block w-full rounded-2xl border border-gray-300 bg-gray-50 p-4 pl-14 text-xl text-gray-900 shadow-xl focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search"
                      value={searchTerm} // Liên kết với state
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <LinkProducts />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categoriesList) && categoriesList.length > 0 ? (
              categoriesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category: ICategory) => (
                  <React.Fragment key={category.id}>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        let value;
                        if (column.id === "name") {
                          value = category.name;
                        } else if (column.id === "id") {
                          value = category.id;
                        } else if (column.id === "slug") {
                          value = category.slug;
                          // } else if (column.id === "image") {
                          //   value = (
                          //     <img src={category.image} alt={category.name} style={{ width: '100px', height: 'auto' }} />
                          //   );
                        } else if (column.id === "children") {
                          // Hiển thị ID và name của danh mục con
                          value =
                            category.children && category.children.length > 0
                              ? category.children.map((child) => (
                                  <div
                                    key={child.id}
                                    className="flex justify-center"
                                  >
                                    <span>{child.name}</span>
                                  </div>
                                ))
                              : "Không có danh mục con";
                        } else if (column.id === "action") {
                          value = (
                            <>
                              {category.name !== "Danh mục lưu trữ" && ( // Ẩn cả nút xóa và chỉnh sửa nếu tên là "Danh mục lưu trữ"
                                <>
                                  <Tooltip title="Delete category">
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() =>
                                        openPopup(
                                          <CFButton
                                            title="Are you sure you want to delete this item?"
                                            handleDelete={() =>
                                              handleDelete(category.id)
                                            }
                                          />,
                                        )
                                      }
                                    >
                                      <DeleteIcon color="error" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Edit category">
                                    <Link to={`/admin/genre/${category.id}`}>
                                      <IconButton aria-label="edit">
                                        <EditIcon color="primary" />
                                      </IconButton>
                                    </Link>
                                  </Tooltip>
                                </>
                              )}
                            </>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </React.Fragment>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {" "}
                  {/* Đảm bảo colSpan tương ứng với số cột mới */}
                  <Typography color="error">
                    Không có danh mục nào để hiển thị.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 30, 40]}
        component="div"
        count={allCategory.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
