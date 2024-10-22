import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, LinearProgress, Tooltip, TablePagination, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Search from "./Components/Search";
import LinkProducts from "./Components/Button";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "@/components/Confirm";
import axios from "axios";
import { ProductType } from "@/types/product";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "@/services/productApi";

interface Column {
  id: "id" | "name" | "price" | "category" | "img" | "action" | "";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "id", label: "Id", minWidth: 70 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 170, align: "right" },
  { id: "img", label: "Image", minWidth: 100, align: "right" },
  { id: "action", label: "Action", minWidth: 70, align: "right" },
  { id: "", label: "", minWidth: 80, align: "right" },
];

export default function ListProducts() {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { openPopup } = useModalContext();
  const [loading, setLoading] = React.useState(true);
  const [deleteProduct] = useDeleteProductMutation();
  // Hàm gọi API để lấy dữ liệu sản phẩm từ địa chỉ mới
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products"); // Địa chỉ API mới
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (productId: number) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Sản phẩm đã được xóa thành công.");
      window.location.reload()
    } catch (err) {

      const error = err as { status?: number; data?: { message?: string } };
      const errorMessage = error.data?.message || "Failed to delete category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to delete category:", error); // Log lỗi
    }
  };
  if (loading) return <LinearProgress />;

  return (
    <Paper sx={{ width: "100%", borderRadius: "10px" }}>
      <TableContainer className="max-h-[600px]" style={{ borderRadius: "10px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
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
          <TableBody >
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product: ProductType) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                  {columns.map((column) => {
                    let value;
                    if (column.id === "id") {
                      value = product.id;
                    } if (column.id === "name") {
                      value = product.name;
                    } else if (column.id === "price") {
                      value = formatCurrency(product.price_regular);
                    } else if (column.id === "category") {
                      value = product.category.name;
                    } else if (column.id === "img") {
                      value = (
                        <img src={product.img_thumbnail} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                      );
                    } else if (column.id === "action") {
                      value = product.is_active.toString();
                    } else if (column.id === "") {
                      value = (
                        <>
                          <Tooltip title="Delete product">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                openPopup(
                                  <Confirm
                                    title="Are you sure?"
                                    description="Do you really want to delete this product?"
                                    handleDelete={() => handleDelete(product.id)}
                                  />
                                )
                              }
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit product">
                            <Link to={`/admin/products/${product.id}`}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="error">Không có sản phẩm nào để hiển thị.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
