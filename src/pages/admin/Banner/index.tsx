// src/components/BannerAdmin/BannerAdmin.tsx

import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
import { useGetAllBannerAdminQuery } from "@/services/productApi";

const BannerAdmin = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialogEdit = () => setOpenDialogEdit(true);
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  const { data: banners } = useGetAllBannerAdminQuery();

  return (
    <div className="mx-auto p-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="mb-16 text-[2rem] font-bold">Danh sách banner</h1>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Thêm mới
        </Button>
      </div>
      <div className="grid grid-cols-[50px_150px_1fr_2fr_100px] gap-4 rounded-lg bg-[#EBEAFF] p-5 text-center font-bold">
        <p>#</p>
        <p>Ảnh banner</p>
        <p>Tên Sự kiện</p>
        <p>Đường dẫn</p>
        <p>Hành động</p>
      </div>
      {banners?.data.map((banner, index) => (
        <div
          className="mt-10 grid grid-cols-[50px_150px_1fr_2fr_100px] items-center gap-4 text-center"
          key={banner.id}
        >
          <p>{index + 1}</p>
          <Link to="#" className="mx-auto h-[100px] w-[150px]">
            <img src={banner.image} alt="" className="h-full w-full" />
          </Link>
          <h2 className="font-manrope text-[1.8rem] font-bold text-[#000]">
            {banner.name}
          </h2>
          <Link
            to="#"
            className="inline-block text-blue-500 transition-colors hover:text-blue-700"
          >
            <p className="font-semibold underline">{banner.link}</p>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <IconButton>
              <DeleteOutlineIcon color="error" />
            </IconButton>
            <IconButton onClick={handleOpenDialogEdit}>
              <Edit color="info" />
            </IconButton>
          </div>
        </div>
      ))}
      <AddBanner
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />

      <EditBanner
        openDialogEdit={openDialogEdit}
        handleCloseDialogEdit={handleCloseDialogEdit}
      />
    </div>
  );
};

export default BannerAdmin;
