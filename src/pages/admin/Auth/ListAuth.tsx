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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import Confirm from "@/components/Confirm";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { useGetUsersAdminQuery } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import useDateFormatter from "@/hooks/useDateFormatter";

interface Column {
  id: "id" | "name" | "email" | "role" | "created_at" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 70 },
  { id: "name", label: "Họ tên", minWidth: 180 },
  { id: "email", label: "Email", minWidth: 210 },
  { id: "role", label: "Vai trò", minWidth: 80 },
  { id: "created_at", label: "Ngày đăng ký", minWidth: 170 },
  { id: "action", label: "Hành động", minWidth: 130 },
];

export default function ListAuth() {
  const { openPopup } = useModalContext();
  const [page, setPage] = React.useState(0);
  const { formatDate } = useDateFormatter(); // Call the custom hook here
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const { data: users, isLoading } = useGetUsersAdminQuery();

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

  const handleDelete = (id: number) => {
    alert(`Deleted user with ID: ${id}`);
  };

  const handleUpdate = (id: number) => {
    console.log("Update user with ID:", id);
  };

  React.useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(isLoading));
    }
  }, [isLoading, dispatch]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: "555px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Tooltip title="Xóa người dùng">
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  openPopup(
                                    <Confirm
                                      title="Bạn chắc chắn"
                                      description="Bạn có chắc chắn muốn xóa mục này không? Hành động này sẽ không thể khôi phục."
                                      handleDelete={() => handleDelete(user.id)}
                                    />,
                                  )
                                }
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sửa người dùng">
                              <IconButton
                                aria-label="update"
                                onClick={() => handleUpdate(user.id)}
                              >
                                <EditIcon color="info" />
                              </IconButton>
                            </Tooltip>
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
                        } else if (Array.isArray(value)) {
                          displayValue = value.map((address, index) => (
                            <div key={index}>{JSON.stringify(address)}</div>
                          ));
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users?.users.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
