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
import LinkProducts from "./Components/Button";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import axios from "axios";
import { ProductType } from "@/types/product";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "@/services/productApi";
import CFButton from "../CfButton";

interface Column {
  id: "id" | "name" | "price" | "price_sale" | "img" | "category" | "";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}

const columns: Column[] = [
  { id: "id", label: "Id", minWidth: 70 },
  { id: "name", label: "Tên", minWidth: 100, },
  { id: "img", label: "Ảnh", minWidth: 100, align: "center" },
  { id: "price", label: "Giá gốc", minWidth: 100 },
  { id: "price_sale", label: "Giá sale", minWidth: 70, align: "right" },
  { id: "category", label: "Thể loại", minWidth: 170, align: "right" },
  { id: "", label: "", minWidth: 80, align: "right" },
];

export default function ListProducts() {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { openPopup } = useModalContext();
  const [loading, setLoading] = React.useState(true);
  const [deleteProduct] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allProducts, setAllProducts] = React.useState<ProductType[]>([]);
  // Hàm gọi API để lấy dữ liệu sản phẩm từ địa chỉ mới
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products"); // Địa chỉ API mới
      setProducts(response.data.products);
      setAllProducts(response.data.products);
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

  // hàm tìm kiếm
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang
    if (searchTerm === "") {
      setProducts(allProducts)
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tên
      );
      setProducts(filteredProducts); // Cập nhật danh sách sản phẩm hiển thị
    }
  };
  // end hàm tìm kiếm

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
                <form className="flex items-center" onSubmit={handleSearch} >
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
                      className="block shadow-xl  w-full rounded-2xl border border-gray-300 bg-gray-50 p-4 pl-14 text-xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search"

                      value={searchTerm} // Liên kết với state
                      onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state
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
                    } else if (column.id === "price_sale") {
                      value = <span className="text-red-600">
                        {formatCurrency(product.price_sale)}
                      </span>
                    } else if (column.id === "img") {
                      value = (
                        <img src={product.img_thumbnail} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                      );

                    } else if (column.id === "") {
                      value = (
                        <>
                          <Tooltip title="Delete product">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                openPopup(
                                  <CFButton
                                    title="Are you sure you want to delete this item?"
                                    handleDelete={() => handleDelete(product.id)}
                                  />
                                )
                              }
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit product">
                            <Link to={`/admin/product/${product.slug}`}>
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
        rowsPerPageOptions={[5, 10, 20, 50]}
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
