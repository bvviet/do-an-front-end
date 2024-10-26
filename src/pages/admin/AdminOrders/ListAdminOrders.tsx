import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import useDateFormatter from "@/hooks/useDateFormatter";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useGetOrdersAdminQuery } from "@/services/productApi";

interface Column {
  id: "id" | "order_status" | "user_id" | "total_amount" | "created_at" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "id", label: "Mã đơn hàng", minWidth: 70 },
  { id: "order_status", label: "Tình trạng", minWidth: 180 },
  { id: "user_id", label: "Khách hàng", minWidth: 210 },
  { id: "total_amount", label: "Tổng tiền", minWidth: 80 },
  { id: "created_at", label: "Ngày mua hàng", minWidth: 170 },
  { id: "action", label: "Hành động", minWidth: 130 },
];

export default function ListAdminOrders() {
  const [page, setPage] = React.useState(0);
  const { formatDate } = useDateFormatter();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const { data: orders, isLoading } = useGetOrdersAdminQuery();
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();

  React.useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    // try {
    //   await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
    //   // Cập nhật thành công
    //   console.log("Cập nhật trạng thái thành công cho đơn hàng ID:", orderId);
    // } catch (error) {
    //   console.error("Cập nhật trạng thái không thành công:", error);
    // }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "555px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#f5f5f5",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : (
              orders?.orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Tooltip title="Chi tiết đơn hàng">
                              <IconButton aria-label="VisibilityIcon">
                                <Link to={`/admin/order/detail/${user.id}`}>
                                  <Visibility color="info" />
                                </Link>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cập nhật trạng thái">
                              <IconButton
                                aria-label="update"
                                onClick={() =>
                                  console.log("Update user with ID:", user.id)
                                }
                              >
                                <EditIcon color="info" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        );
                      } else if (column.id === "status") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Select
                              value={orders.orders}
                              onChange={(e) =>
                                handleUpdateStatus(user.id, e.target.value)
                              }
                              displayEmpty
                              inputProps={{ "aria-label": "Chọn trạng thái" }}
                            >
                              <MenuItem value="pending">Đang chờ</MenuItem>
                              <MenuItem value="processing">Đang xử lý</MenuItem>
                              <MenuItem value="completed">Hoàn thành</MenuItem>
                              <MenuItem value="canceled">Đã hủy</MenuItem>
                            </Select>
                          </TableCell>
                        );
                      } else {
                        const value = user[column.id as keyof typeof user];
                        let displayValue: React.ReactNode;

                        if (column.id === "created_at") {
                          displayValue =
                            typeof value === "string"
                              ? formatDate(value)
                              : "N/A";
                        } else {
                          displayValue = value;
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {displayValue}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders?.orders.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
