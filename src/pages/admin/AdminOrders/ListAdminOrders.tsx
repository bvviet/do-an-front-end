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
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import useDateFormatter from "@/hooks/useDateFormatter";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  useFilterByDateOrdersAdminQuery,
  useGetOrdersAdminQuery,
  // useGetOrdersAdminQuery,
  // useGetOrdersUserQuery,
} from "@/services/productApi";
import { getOrderStatus } from "@/utils/getOrderStatus";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi"; // Nhập locale tiếng Việt
import { toast } from "react-toastify";
import { GetallOrderAdminsResponse } from "@/types/order";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import status from "@/utils/status";
import { formatCurrency } from "@/utils/formatCurrency";
type FetchError = {
  data?: {
    message?: string;
  };
};
dayjs.locale("vi");
interface Column {
  id:
    | "order_code"
    | "order_status"
    | "name"
    | "total_amount"
    | "created_at"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "order_code", label: "Mã đơn hàng", minWidth: 70 },
  { id: "order_status", label: "Tình trạng", minWidth: 180 },
  { id: "name", label: "Khách hàng", minWidth: 210 },
  { id: "total_amount", label: "Tổng tiền", minWidth: 80 },
  { id: "created_at", label: "Ngày mua hàng", minWidth: 170 },
  { id: "action", label: "Hành động", minWidth: 130 },
];

export default function ListAdminOrders() {
  const [value, setValue] = React.useState("all");
  const [orders, setOrders] = React.useState<
    GetallOrderAdminsResponse | undefined
  >(undefined);
  const [page, setPage] = React.useState(0);
  const { formatDate } = useDateFormatter();
  const [selectedDateRange, setSelectedDateRange] = React.useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const {
  //   data: ordersAll,
  //   isLoading: isLoadingAll,
  //   refetch,
  // } = useGetOrdersAdminQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });

  const {
    data: ordersStatus,
    isLoading: isLoadingGetStatus,
    refetch,
  } = useGetOrdersAdminQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Format start_date và end_date
  const start_date = selectedDateRange[0]
    ? dayjs(selectedDateRange[0]).format("YYYY-MM-DD HH:mm:ss")
    : "";
  const end_date = selectedDateRange[1]
    ? dayjs(selectedDateRange[1]).format("YYYY-MM-DD HH:mm:ss")
    : "";

  // Luôn luôn gọi query
  const {
    data: ordersByDate,
    error,
    isLoading: isLoadingByDate,
  } = useFilterByDateOrdersAdminQuery(
    { start_date, end_date },
    { skip: !selectedDateRange[0] || !selectedDateRange[1] },
  );

  React.useEffect(() => {
    if (ordersByDate || ordersStatus) {
      setOrders(ordersByDate || ordersStatus);
    }
  }, [ordersByDate, ordersStatus, value]);

  console.log(orders);

  const handleDateChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    setSelectedDateRange(newValue);
  };

  // Hiển thị thông báo lỗi nếu có
  React.useEffect(() => {
    if (error) {
      toast.error((error as FetchError).data?.message || "Có lỗi xảy ra");
    }
  }, [error, ordersByDate]);

  // Dispatch hành động loading
  React.useEffect(() => {
    dispatch(setLoading(isLoadingByDate || isLoadingGetStatus));
  }, [dispatch, isLoadingByDate, isLoadingGetStatus]);

  const handleClear = () => {
    setValue("all");
    setSelectedDateRange([null, null]);
    refetch();
    setOrders(ordersStatus);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log({ ordersStatus });

  // const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };
  return (
    <>
      <div className="flex">
        <div className="w-1/2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker
                value={selectedDateRange}
                onChange={handleDateChange}
                localeText={{ start: "Từ ngày", end: "Đến ngày" }}
              />
              <Button
                onClick={handleClear}
                variant="outlined"
                color="secondary"
              >
                Chọn lại
              </Button>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="w-1/2"></div>
      </div>
      {/* <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {status.map((tus) => (
              <Tab label={tus.label} value={tus.id} />
            ))}
          </TabList>
        </Box>
      </TabContext> */}
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
              {isLoadingGetStatus ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              ) : (
                (orders?.orders || [])
                  .slice()
                  .reverse()
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
                                    <Visibility color="primary" />
                                  </Link>
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          );
                        } else {
                          const value = user[column.id as keyof typeof user];
                          let displayValue: React.ReactNode;

                          if (column.id === "name") {
                            displayValue = user.user?.name || "N/A";
                          } else if (column.id === "created_at") {
                            displayValue =
                              typeof value === "string"
                                ? formatDate(value)
                                : "N/A";
                          } else if (column.id === "total_amount") {
                            displayValue = formatCurrency(value as number);
                          } else if (column.id === "order_status") {
                            const statusValue =
                              user[column.id as keyof typeof user];
                            const status = getOrderStatus(
                              statusValue as string | undefined,
                            ); // Đảm bảo kiểu dữ liệu là string hoặc undefined

                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {status.icon}
                                  <span style={{ marginLeft: 4 }}>
                                    {status.label}
                                  </span>
                                </div>
                              </TableCell>
                            );
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
    </>
  );
}
