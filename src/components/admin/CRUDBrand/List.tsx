
import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import LinkProducts from "../CRUD/Components/Button";
import { Link } from "react-router-dom";
import { BrandType } from "@/types/brand";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { toast } from "react-toastify";
import { useDeleteBrandMutation, useGetAllBrandQuery } from "@/services/productApi";
import CFButton from "../CfButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
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
    const [deleteBrand] = useDeleteBrandMutation()
    const { refetch } = useGetAllBrandQuery();
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState<BrandType[]>([]);
    const [allBrand, setAllBrand] = React.useState<BrandType[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const token = useSelector((state: RootState) => state.auth.access_token);

    const fetchBrand = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://127.0.0.1:8000/api/admin/brands`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề
                    },
                },
            );
            setBrand(response.data.data); // Lấy dữ liệu 
            setAllBrand(response.data.data);

        } catch (error) {
            console.error("Lỗi khi tải voucher:", error);
            toast.error("Không thể tải danh sách voucher.");
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        fetchBrand();
    }, []);
    console.log("312312", allBrand);
    // hàm tìm kiếm
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn reload trang
        if (searchTerm === "") {
            setBrand(allBrand);
        } else {

            const filteredBrands = allBrand.filter((brand) =>
                brand.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tên
            );
            setBrand(filteredBrands); // Cập nhật danh sách sản phẩm hiển thị
        }
    };
    // end hàm tìm kiếm
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
            window.location.reload()
            refetch()
        } catch (err) {

            const error = err as { status?: number; data?: { message?: string } };
            const errorMessage = error.data?.message || "Failed to delete category. Please try again.";
            toast.error(errorMessage);
            console.error("Failed to delete category:", error); // Log lỗi
        }
    };

    if (loading) return <LinearProgress />;
    return <>
        <Paper sx={{ width: "100%", borderRadius: "10px" }}>
            <TableContainer className="max-h-[600px] max-xl:max-h-[430px] max-sm:max-h-[430px]" style={{ borderRadius: "10px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
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
                        {Array.isArray(brand) && brand.length > 0 ? (
                            brand.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((brand: BrandType) => (
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
                count={brand.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
}