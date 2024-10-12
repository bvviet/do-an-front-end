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
import Search from "./Components/Search";
import LinkProducts from "./Components/Button";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "@/components/Confirm";

import { toast } from "react-toastify";
import { useDeleteCategoryMutation } from "@/services/authApi"; // Hook để thực hiện xóa danh mục
import { ICategory } from "@/types/genre"; // Kiểu dữ liệu cho danh mục
import useCategories from "@/hooks/useGenre";
import { Link } from "react-router-dom";

interface Column {
  id: "name" | "id" | "action" | "image" | "slug" | "children";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "image", label: "Image", minWidth: 170, align: "center" },
  { id: "slug", label: "Slug", minWidth: 170, align: "center" },
  { id: "children", label: "Children", minWidth: 200, align: "center" }, // Cột mới cho danh mục con
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

export default function ListCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { openPopup } = useModalContext();
  const { categories, isLoading, error } = useCategories();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categoriesList = Array.isArray(categories) ? categories : categories?.categories || [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully");
    } catch (err) {
      const error = err as { status?: number; data?: { message?: string } };
      const errorMessage = error.data?.message || "Failed to delete category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to delete category:", error);
    }
  };

  if (isLoading) return <LinearProgress />;

  return (
    <Paper sx={{ width: "100%", borderRadius: "10px" }}>
      <TableContainer className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]" style={{ borderRadius: "10px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Search />
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <LinkProducts />
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categoriesList) && categoriesList.length > 0 ? (
              categoriesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category: ICategory) => (
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
                      } else if (column.id === "image") {
                        value = (
                          <img src={category.image} alt={category.name} style={{ width: '100px', height: 'auto' }} />
                        );
                      } else if (column.id === "children") {
                        // Hiển thị ID và name của danh mục con
                        value = category.children && category.children.length > 0
                          ? category.children.map(child => (
                            <div key={child.id} className="flex justify-center">
                              <span>{child.id} | {child.name}</span>
                            </div>
                          ))
                          : "No children"; // Nếu không có danh mục con
                      } else if (column.id === "action") {
                        value = (
                          <>
                            <Tooltip title="Delete category">
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  openPopup(
                                    <Confirm
                                      title="Are you sure?"
                                      description="Do you really want to delete this category?"
                                      handleDelete={() => handleDelete(category.id)}
                                    />
                                  )
                                }
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit category">
                              <Link to={`/admin/categories/${category.id}`}>
                                <IconButton aria-label="edit">
                                  <EditIcon color="primary" />
                                </IconButton>
                              </Link>
                            </Tooltip>
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
                <TableCell colSpan={6} align="center"> {/* Đảm bảo colSpan tương ứng với số cột mới */}
                  <Typography color="error">Không có danh mục nào để hiển thị.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={Array.isArray(categories) ? categories.length : 0} // Kiểm tra categories là mảng
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
