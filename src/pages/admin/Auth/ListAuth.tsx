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

interface Column {
  id: "id" | "fullName" | "email" | "role" | "lastLogin" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 70 },
  { id: "fullName", label: "Họ tên", minWidth: 180 },
  { id: "email", label: "Email", minWidth: 210 },
  { id: "role", label: "Vai trò", minWidth: 80 },
  { id: "lastLogin", label: "Ngày đăng ký", minWidth: 170 },
  { id: "action", label: "Hành động", minWidth: 130 },
];

// Mảng users
const users = [
  {
    id: "1",
    fullName: "Nguyễn Văn Anh",
    email: "nguyenvana@gmail.com",
    role: "user",
    lastLogin: "2024-09-21 10:00",
  },
  {
    id: "2",
    fullName: "Trần Văn B",
    email: "tranvanb@gmail.com",
    role: "admin",
    lastLogin: "2024-09-18 09:00",
  },
  {
    id: "3",
    fullName: "Lê Thị C",
    email: "lethic@gmail.com",
    role: "user",
    lastLogin: "2024-09-17 15:30",
  },
  {
    id: "4",
    fullName: "Phạm Minh D",
    email: "phamminhd@gmail.com",
    role: "moderator",
    lastLogin: "2024-09-16 14:00",
  },
  {
    id: "5",
    fullName: "Hoàng Thị E",
    email: "hoangthie@gmail.com",
    role: "user",
    lastLogin: "2024-09-15 11:45",
  },
  {
    id: "6",
    fullName: "Vũ Văn F",
    email: "vuf@gmail.com",
    role: "admin",
    lastLogin: "2024-09-14 09:20",
  },
  {
    id: "7",
    fullName: "Nguyễn Thị G",
    email: "nguyentg@gmail.com",
    role: "user",
    lastLogin: "2024-09-13 13:00",
  },
  {
    id: "8",
    fullName: "Bùi Văn H",
    email: "buivanh@gmail.com",
    role: "moderator",
    lastLogin: "2024-09-12 08:00",
  },
  {
    id: "9",
    fullName: "Lê Văn I",
    email: "levani@gmail.com",
    role: "admin",
    lastLogin: "2024-09-11 16:30",
  },
  {
    id: "10",
    fullName: "Trương Thị J",
    email: "truongthij@gmail.com",
    role: "user",
    lastLogin: "2024-09-10 12:15",
  },
  {
    id: "11",
    fullName: "Nguyễn Văn K",
    email: "nguyenvank@gmail.com",
    role: "admin",
    lastLogin: "2024-09-09 10:50",
  },
  {
    id: "12",
    fullName: "Đỗ Thị L",
    email: "dothil@gmail.com",
    role: "moderator",
    lastLogin: "2024-09-08 09:30",
  },
  {
    id: "13",
    fullName: "Nguyễn Thị M",
    email: "nguyenthm@gmail.com",
    role: "user",
    lastLogin: "2024-09-07 14:20",
  },
  {
    id: "14",
    fullName: "Vũ Văn N",
    email: "vuvann@gmail.com",
    role: "admin",
    lastLogin: "2024-09-06 11:00",
  },
  {
    id: "15",
    fullName: "Trần Thị O",
    email: "tranthio@gmail.com",
    role: "user",
    lastLogin: "2024-09-05 16:40",
  },
  {
    id: "16",
    fullName: "Bùi Thị P",
    email: "buithip@gmail.com",
    role: "moderator",
    lastLogin: "2024-09-04 09:10",
  },
];

export default function ListAuth() {
  const { openPopup } = useModalContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: string) => {
    alert(`Deleted user with ID: ${id}`);
    // Logic để xóa user theo ID
  };
  const handleUpdate = (id: string) => {
    console.log("Update user with ID:", id);
    // Logic để xóa user theo ID
  };

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
            {users
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
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
