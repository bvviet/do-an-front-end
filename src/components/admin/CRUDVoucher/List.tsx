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
import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import CFButton from "../CfButton";
import { useDeleteVoucherMutation, useGetAllVoucherQuery } from "@/services/productApi";
import Search from "../CRUD/Components/Search";
import LinkProducts from "../CRUD/Components/Button";
import { IVoucher } from "@/types/voucher";

const columns = [
    { id: "id", label: "ID", minWidth: 100, align: "center" },
    { id: "name", label: "Tên", minWidth: 150, align: "center" },
    { id: "discount", label: "Giảm giá", minWidth: 100, align: "center" },
    { id: "minimum_order_value", label: "Đơn tối thiểu", minWidth: 120, align: "center" },
    { id: "code", label: "Mã", minWidth: 100, align: "center" },
    { id: "applicable", label: "Áp dụng", minWidth: 100, align: "center" },
    { id: "productId", label: "Id sản phẩm", minWidth: 150, align: "center" },
    { id: "", label: "", minWidth: 150, align: "center" },
];

export default function ListVoucher() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { openPopup } = useModalContext();
    const [deleteVoucher] = useDeleteVoucherMutation();
    const { data, error, isLoading, refetch } = useGetAllVoucherQuery({
        page: page + 1,
        limit: rowsPerPage,
    });

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0); // Quay lại trang đầu khi thay đổi số dòng trên mỗi trang
    };

    const handleDelete = async (voucherId: number) => {
        try {
            await deleteVoucher(voucherId).unwrap();
            toast.success("Voucher đã được xóa thành công.");
            refetch()
        } catch (err) {
            const error = err as { data?: { message?: string } };
            const errorMessage = error.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
            toast.error(errorMessage);
        }
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <Typography color="error">Có lỗi xảy ra: {JSON.stringify(error)}</Typography>;

    const vouchers = data?.vouchers || [];
    const totalAvailableVouchers = data?.total_available_vouchers || 0;

    return (
        <Paper sx={{ width: "100%", borderRadius: "10px" }}>
            <TableContainer className="max-h-[600px]" style={{ borderRadius: "10px" }}>
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
                                <TableCell key={column.id} style={{ top: 57, minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vouchers.length > 0 ? (
                            vouchers.map((voucher: IVoucher) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={voucher.id}>
                                    {columns.map((column) => {
                                        let value;
                                        if (column.id === "id") value = voucher.id;
                                        else if (column.id === "name") value = voucher.name;
                                        else if (column.id === "discount")
                                            value = `${Math.round(parseFloat(voucher.discount_value))}%`;
                                        else if (column.id === "minimum_order_value") {
                                            // Chuyển voucher.minimum_order_value thành số
                                            const minimumOrderValue = parseFloat(voucher.minimum_order_value.toString());

                                            // Kiểm tra xem số có hợp lệ không
                                            if (!isNaN(minimumOrderValue)) {
                                                // Định dạng số theo kiểu tiền tệ
                                                const formattedValue = new Intl.NumberFormat('vi-VN').format(minimumOrderValue);

                                                // Thêm đơn vị "VND" và áp dụng màu đỏ cho chữ
                                                value = (
                                                    <span className="text-red-600">
                                                        {formattedValue} <span>&#8363;</span>
                                                    </span>
                                                );
                                            } else {
                                                value = "Không hợp lệ"; // Nếu giá trị không hợp lệ
                                            }
                                        }
                                        else if (column.id === "code") value = voucher.code;
                                        else if (column.id === "applicable") value = voucher.applicable_type;
                                        else if (column.id === "productId") {
                                            const applicableIds = JSON.parse(voucher.applicable_ids);
                                            value = Array.isArray(applicableIds) ? applicableIds.join(", ") : "";
                                        } else if (column.id === "") {
                                            value = (
                                                <>
                                                    <Tooltip title="Delete Voucher">
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() =>
                                                                openPopup(
                                                                    <CFButton
                                                                        title="Bạn có chắc chắn muốn xóa không?"
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
                                        return <TableCell key={column.id} >{value}</TableCell>;
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
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
                count={totalAvailableVouchers}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
