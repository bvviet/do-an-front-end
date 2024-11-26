import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import AvatarComponent from "../../../Avatar";
import { CommentItem } from "@/types/comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "@/components/Confirm";
import {
  useDeleteCommentsMutation,
  useUpdateCommentMutation,
} from "@/services/productApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserInfor } from "@/hooks/useUserInfor";

const ReviewItem = ({
  comment,
  productId,
}: {
  comment: CommentItem;
  productId: number;
}) => {
  const [rating, setRating] = useState<number | null>(3.5);
  const [openDialog, setOpenDialog] = useState(false);
  const { openPopup } = useModalContext();
  const dispatch = useDispatch();
  const user = useUserInfor();
  console.log({ user });

  const [deleteComment, { isLoading: isLoadingUpdate }] =
    useDeleteCommentsMutation();
  const [updateComment, { isLoading }] = useUpdateCommentMutation();
  // const { data } = useGetCommentsQuery({ productId });

  const handleDelete = async (commentId: number) => {
    const response = await deleteComment({ commentId, productId }).unwrap();
    toast.success(response.message);
  };

  const formSchema = yup.object().shape({
    content: yup
      .string()
      .min(3, "Nội dung phải có ít nhất 3 ký tự")
      .required("Nội dung không được bỏ trống"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    if (rating === null) {
      toast.error("Vui lòng chọn sao đánh giá sản phẩm");
      return;
    }
    try {
      const response = await updateComment({
        rating,
        content: data.content,
        productId,
      });
      toast.success(response.data?.message);
      setOpenDialog(false);
      reset();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading || isLoadingUpdate));
  }, [dispatch, isLoading, isLoadingUpdate]);

  return (
    <div className="rounded-md border border-solid border-[#C4D1D0] p-[28px]">
      <div className="flex items-center justify-between">
        <Tooltip title="Xem trang cá nhân" arrow>
          <Link to="/account" className="block h-[54px] w-[54px]">
            <AvatarComponent
              width="50"
              height="50"
              urlImage={`${comment.user.avatar ? comment.user.avatar : "https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}`}
            />
          </Link>
        </Tooltip>
        {comment.user_id === user?.id ? (
          <div>
            <IconButton onClick={handleOpenDialog}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <DeleteIcon
                color="error"
                onClick={() =>
                  openPopup(
                    <Confirm
                      titleButton={"Xóa"}
                      handleDelete={() => handleDelete(comment.id)}
                    />,
                  )
                }
              />
            </IconButton>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="mt-[12px] text-[1.8rem] font-semibold leading-[166.667%]">
        {comment.user.name}
      </p>
      <div className="flex items-center gap-1">
        <Rating name="half-rating" value={comment.rating} readOnly />
      </div>
      <div className="mt-[28px]">
        {/* <h4 className="mb-[16px] text-[2rem] font-bold">Beautiful Sweater</h4> */}
        <p className="text-[1.6rem] leading-[175%] text-[#566363]">
          “{comment.content}”
        </p>
      </div>

      {/*  */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            width: "550px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle>Sửa bình luận</DialogTitle>
        <DialogContent>
          <div className="mb-[5px] lg:mb-[30px]">
            <h4 className="text-[1.7rem] font-bold leading-[150%]">
              How would you rate this?
            </h4>
            <Rating
              name="half-rating"
              value={rating}
              precision={0.5}
              size="large"
              onChange={(event, newValue) => setRating(newValue)}
            />
          </div>
          {/* Form của react-hook-form */}
          <form
            id="dialog-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Textarea */}
            <div className="flex gap-2">
              <textarea
                id="no-buy"
                placeholder="Nhập nội dung đánh giá."
                {...register("content", {
                  required: "Vui lòng chọn một lý do",
                })}
                className={`border ${errors.content ? "border-red-500" : "border-gray-300"} w-full rounded-md p-4`}
                style={{
                  minHeight: "150px",
                }}
              />
            </div>
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Hủy
          </Button>
          {/* Nút submit form */}
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
    </div>
  );
};

export default ReviewItem;
