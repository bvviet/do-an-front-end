import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Search from "./Components/Search";
import LinkProducts from "./Components/Button";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "@/components/Confirm";

interface Column {
  id: "name" | "price" | "category" | "img" | "action" | "";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "img",
    label: "Image",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
  {
    id: "", // Cột trống không có tiêu đề
    label: "",
    minWidth: 50,
    align: "right",
  },
];

interface Data {
  id: string;
  name: string;
  price: number;
  category: string;
  img: string;
  action: string;
}

const rows: Data[] = [
  {
    id: "1", name: "iPhone 16 Promax", price: 120001, category: "Phones", img: "image1.jpg", action: "Some action",
  },
  {
    id: "2", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "3", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "4", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "5", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "6", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "7", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "8", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "9", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "10", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "11", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "12", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  {
    id: "13", name: "Samsung Galaxy S22", price: 100000, category: "Phones", img: "image2.jpg", action: "Some action",
  },
  // Các mục khác...
];

export default function ListCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { openPopup } = useModalContext();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: string) => {
    alert(`Deleted product with ID: ${id}`);
    // Logic để xóa sản phẩm theo ID
  };

  const handleUpdate = (id: string) => {
    console.log("Update product with ID:", id);
    // Logic để cập nhật sản phẩm theo ID
  };

  return (
    <Paper sx={{ width: "100%", borderRadius: "10px" }}>
      <TableContainer className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]" style={{ borderRadius: "10px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow style={{ top: 0 }}>
              <TableCell align="center" colSpan={5}>
                <Search />
              </TableCell>
              <TableCell align="center" colSpan={1}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    if (column.id === "") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Tooltip title="Delete product">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                openPopup(
                                  <Confirm
                                    title="Bạn chắc chứ?"
                                    description="Bạn có thật sự muốn xoá sản phẩm này."
                                    handleDelete={() => handleDelete(row.id)}
                                  />,
                                )
                              }
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit product">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleUpdate(row.id)}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    } else {
                      const value = row[column.id as keyof Data];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 35]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
