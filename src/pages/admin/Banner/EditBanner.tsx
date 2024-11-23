/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";

const EditBanner = ({ openDialogEdit, handleCloseDialogEdit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("link", data.link);
      if (data.imgUrl[0]) {
        formData.append("imgUrl", data.imgUrl[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={openDialogEdit}
      onClose={handleCloseDialogEdit}
      PaperProps={{
        sx: {
          width: "550px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle>Cập nhật banner</DialogTitle>
      <DialogContent>
        <form
          id="dialog-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Tên sự kiện"
            {...register("name", { required: "Vui lòng nhập tên sự kiện" })}
            className={`w-full rounded-md border p-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="text"
            placeholder="Đường dẫn"
            {...register("link", { required: "Vui lòng nhập đường dẫn" })}
            className={`w-full rounded-md border p-2 ${
              errors.link ? "border-red-500" : "border-gray-300"
            }`}
          />

          <input
            type="file"
            {...register("imgUrl", { required: "Vui lòng chọn ảnh" })}
            className="w-full rounded-md border p-2"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogEdit} variant="outlined">
          Hủy
        </Button>
        <Button
          type="submit"
          form="dialog-form"
          variant="contained"
          color="secondary"
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBanner;
