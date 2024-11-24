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
import Search from "../CRUD/Components/Search";
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Column {
  id:
    | "name"
    | "id"
    | "discount"
    | "usage"
    | "code"
    | "applicable"
    | "productId"
    | "";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "discount", label: "Discount", minWidth: 100, align: "center" },
  { id: "usage", label: "Usage", minWidth: 100, align: "center" },
  { id: "code", label: "Code", minWidth: 100, align: "center" },
  { id: "applicable", label: "Applicable", minWidth: 100, align: "center" },
  { id: "productId", label: "ProductId", minWidth: 150, align: "center" },
  { id: "", label: "", minWidth: 150, align: "center" },
];

export default function ListVoucher() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { openPopup } = useModalContext();
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [deleteVoucher] = useDeleteVoucherMutation();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0, // Tổng số bản ghi (thông tin này cần phải trả về từ API)
  });

  const token = useSelector((state: RootState) => state.auth.access_token);
  const fetchVouchersByPage = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/voucher?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setVouchers(response.data.vouchers);
      console.log(response);

      setPagination({
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        total: response.data.total, // Tổng số bản ghi
      });
    } catch (error) {
      console.error("Lỗi khi tải voucher:", error);
      toast.error("Không thể tải danh sách voucher.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchersByPage(page + 1); // Lấy voucher ở trang hiện tại
  }, [page, rowsPerPage]); // Khi trang hoặc số lượng dòng thay đổi

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Khi thay đổi số dòng mỗi trang, quay về trang đầu tiên
  };

  const handleDelete = async (brandID: number) => {
    try {
      await deleteVoucher(brandID).unwrap();
      toast.success("Voucher đã được xóa thành công.");
      fetchVouchersByPage(page);
    } catch (err) {
      const error = err as { status?: number; data?: { message?: string } };
      const errorMessage =
        error.data?.message || "Failed to delete category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to delete category:", error); // Log lỗi
    }
  };

  if (loading) return <LinearProgress />;

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
                  <Search />
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
                vouchers.map((voucher) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={voucher.id}
                  >
                    {columns.map((column) => {
                      let value;
                      if (column.id === "id") {
                        value = voucher.id;
                      } else if (column.id === "name") {
                        value = voucher.name;
                      } else if (column.id === "discount") {
                        value = `${Math.round(parseFloat(voucher.discount_value))}%`;
                      } else if (column.id === "usage") {
                        value = voucher.usage_limit;
                      } else if (column.id === "code") {
                        value = voucher.code;
                      } else if (column.id === "applicable") {
                        value = voucher.applicable_type;
                      } else if (column.id === "productId") {
                        const applicableIds = JSON.parse(
                          voucher.applicable_ids,
                        );
                        value = Array.isArray(applicableIds)
                          ? applicableIds.join(", ")
                          : "";
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
                                      handleDelete={() =>
                                        handleDelete(voucher.id)
                                      }
                                    />,
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="error">
                      Không có voucher nào để hiển thị.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={pagination.total} // Tổng số bản ghi từ API
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
