import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import LinkProducts from "../CRUD/Components/Button";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { IVoucher } from "@/types/voucher";
import CFButton from "../CfButton";
import { useDeleteVoucherMutation } from "@/services/productApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/utils/formatCurrency";

interface Column {
  id:
  | "name"
  | "id"
  | "discount"
  | "day"
  | "code"
  | "usage_limit"
  | "used_count"
  | "";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Tên", minWidth: 170, align: "center" },
  { id: "discount", label: "Giảm", minWidth: 100, align: "center" },
  { id: "day", label: "Ngày", minWidth: 100, align: "center" },
  { id: "code", label: "Mã", minWidth: 100, align: "center" },
  { id: "usage_limit", label: "Lượt dùng", minWidth: 100, align: "center" },
  { id: "used_count", label: "Còn", minWidth: 150, align: "center" },
  { id: "", label: "", minWidth: 150, align: "center" },
];

export default function ListVoucher() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { openPopup } = useModalContext();
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [allVouchers, setAllVouchers] = useState<IVoucher[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [deleteVoucher] = useDeleteVoucherMutation();
  const token = useSelector((state: RootState) => state.auth.access_token);
  const fetchVouchersByPage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/getAllVouchers`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề
          },
        },
      );
      setVouchers(response.data.vouchers); // Lấy dữ liệu voucher
      setAllVouchers(response.data.vouchers);
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
      toast.error("Không thể tải danh sách voucher.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchersByPage(); // Lấy voucher ở trang hiện tại
  }, [page, rowsPerPage, token]); // Khi trang hoặc số lượng dòng thay đổi

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang
    if (searchTerm === "") {
      setVouchers(allVouchers);
    } else {
      const filteredVoucher = allVouchers.filter((voucher) =>
        voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tên
      );
      setVouchers(filteredVoucher); // Cập nhật danh sách sản phẩm hiển thị
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (brandID: number) => {
    try {
      await deleteVoucher(brandID).unwrap();
      toast.success("Voucher đã được xóa thành công.");
      fetchVouchersByPage();
    } catch (err) {
      const error = err as { status?: number; data?: { message?: string } };
      const errorMessage =
        error.data?.message || "Failed to delete category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to delete category:", error); // Log lỗi
    }
  };

  if (loading) return <LinearProgress />;
  const formatDiscountValue = (value: string): string => {
    const numericValue = parseFloat(value);

    // Nếu giá trị nhỏ hơn 99, trả về phần trăm
    if (numericValue < 99) {
      return `${Math.round(numericValue)}%`;
    }
    // Nếu giá trị lớn hơn hoặc bằng 99, trả về tiền tệ (VND)
    else {
      return formatCurrency(numericValue);
    }
  };
  return (
    <>
      <Paper sx={{ width: "100%", borderRadius: "10px" }}>
        <TableContainer
          className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]"
          style={{ borderRadius: "10px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
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
              {Array.isArray(vouchers) && vouchers.length > 0 ? (
                vouchers.map((voucher) => {
                  const today = new Date();
                  const endDate = new Date(voucher.end_date);
                  const isExpired = endDate < today || (voucher.usage_limit - voucher.used_count) === 0;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={voucher.id}
                      style={{
                        opacity: isExpired ? 0.5 : 1, // Làm mờ nếu hết hạn
                        // pointerEvents: isExpired ? "none" : "auto", // Không cho phép thao tác nếu hết hạn
                      }}
                    >
                      {columns.map((column) => {
                        let value;
                        if (column.id === "id") {
                          value = voucher.id;
                        } else if (column.id === "name") {
                          value = voucher.name;
                        } else if (column.id === "discount") {
                          value = <span className="text-red-600"> {formatDiscountValue(voucher.discount_value)}</span>;
                        } else if (column.id === "day") {
                          //const startDate = new Date(voucher.start_date);
                          const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

                          if (daysLeft <= 0) {
                            value = <span className="text-red-600">Đã hết hạn</span>;
                          } else if (daysLeft === 1) {
                            value = <span className="text-red-600">Còn 1 ngày</span>;
                          } else {
                            value = `Còn ${daysLeft} ngày`;
                          }
                        } else if (column.id === "code") {
                          value = voucher.code;
                        } else if (column.id === "usage_limit") {
                          value = voucher.usage_limit;
                        } else if (column.id === "used_count") {
                          const remainingUses = voucher.usage_limit - voucher.used_count;

                          if (remainingUses === 0) {
                            value = <span className="text-red-600"> Đã hết lượt dùng</span>;
                          } else {
                            value = `${remainingUses} lượt`;
                          }
                        } else if (column.id === "") {
                          value = (
                            <>
                              <Tooltip title="Delete Voucher">
                                <IconButton
                                  aria-label="delete"
                                  onClick={() =>
                                    openPopup(
                                      <CFButton
                                        title="Are you sure you want to delete this item?"
                                        handleDelete={() => handleDelete(voucher.id)}
                                      />
                                    )
                                  }
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Voucher">
                                <Link to={`/admin/voucher/${voucher.id}`}>
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
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="error">Không có voucher nào để hiển thị.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={vouchers.length} // Tổng số bản ghi từ API
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
