import { useBrands } from "@/hooks/useBrand";
import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import Search from "../CRUD/Components/Search";
import LinkProducts from "../CRUD/Components/Button";
import { Link } from "react-router-dom";
import { BrandType } from "@/types/brand";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { toast } from "react-toastify";
import { useDeleteBrandMutation, useGetAllBrandQuery } from "@/services/productApi";
import CFButton from "../CfButton";
interface Column {
    id: "name" | "id" | "";
    label: string;
    minWidth?: number;
    align?: "right" | "center";
}

const columns: Column[] = [
    { id: "id", label: "ID", minWidth: 100, align: "center" },
    { id: "name", label: "Name", minWidth: 600, align: "center" },
    { id: "", label: "", minWidth: 70, align: "center" },
];
export default function ListBrand() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { openPopup } = useModalContext();
    const { brandsData, brandsLoading } = useBrands();
    const [deleteBrand] = useDeleteBrandMutation()
    const { refetch } = useGetAllBrandQuery();
    console.log(brandsData);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDelete = async (brandID: number) => {
        try {
            await deleteBrand(brandID).unwrap();
            toast.success("Sản phẩm đã được xóa thành công.");

            refetch()
        } catch (err) {

            const error = err as { status?: number; data?: { message?: string } };
            const errorMessage = error.data?.message || "Failed to delete category. Please try again.";
            toast.error(errorMessage);
            console.error("Failed to delete category:", error); // Log lỗi
        }
    };

    if (brandsLoading) return <LinearProgress />;
    return <>
        <Paper sx={{ width: "100%", borderRadius: "10px" }}>
            <TableContainer className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]" style={{ borderRadius: "10px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                <Search />
                            </TableCell>
                            <TableCell align="center" colSpan={1}>
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
                        {Array.isArray(brandsData) && brandsData.length > 0 ? (
                            brandsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((brand: BrandType) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={brand.id}>
                                    {columns.map((column) => {
                                        let value;
                                        if (column.id === "id") {
                                            value = brand.id;
                                        } if (column.id === "name") {
                                            value = brand.name;
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
                                                                       
                                                                        handleDelete={() => handleDelete(brand.id)}
                                                                    />
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit Brand">
                                                        <Link to={`/admin/brand/${brand.id}`}>
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
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={brandsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
}