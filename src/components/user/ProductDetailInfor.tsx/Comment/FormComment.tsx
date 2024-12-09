import { Rating } from "@mui/material";
import ButtonComponent from "../../../ButtonComponent";
import FormField from "@/components/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import { useCreateCommentMutation } from "@/services/productApi";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface dataForm {
  comment: string;
}

interface FormCommentProps {
  productId: number;
}

const FormComment: FC<FormCommentProps> = ({ productId }) => {
  const [rating, setRating] = useState<number | null>(3.5);
  const dispatch = useDispatch();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const formSchema = yup.object().shape({
    comment: yup
      .string()
      .min(3, "Nội dung phải có ít nhất 3 ký tự")
      .required("Nội dung không được bỏ trống"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dataForm>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<dataForm> = async (data) => {
    if (rating === null) {
      toast.error("Vui lòng chọn sao đánh giá sản phẩm");
      return;
    }
    try {
      const response = await createComment({
        rating,
        content: data.comment,
        productId: productId,
      }).unwrap();

      toast.success(response.message);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "status" in error) {
        const err = error as { status: number; data: { message: string } };
        if (err.status === 409) {
          toast.error(err.data.message);
        }
        if (err.status === 403) {
          toast.error(err.data.message);
        }
        if (err.status === 422) {
          toast.error(err.data.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);
  return (
    <div className="ml-auto w-full lg:w-[470px]">
      <div className="mb-[5px] lg:mb-[30px]">
        <h4 className="text-[2rem] font-bold leading-[150%]">
          Bạn đánh giá điều này như thế nào?
        </h4>
        <Rating
          name="half-rating"
          value={rating}
          size="large"
          onChange={(event, newValue) => setRating(newValue)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Description */}
        <div className="my-[20px] flex flex-col gap-[12px] lg:my-[30px]">
          <FormField<dataForm>
            label="Viết đánh giá"
            name="comment"
            placeholder="Hãy cho chúng tôi biết bạn nghĩ gì"
            Component={TextareaInputs}
            control={control}
            error={errors["comment"]}
          />
        </div>

        <ButtonComponent
          title="Thêm bình luận"
          width="190px"
          onClick={() => handleSubmit(onSubmit)()}
          loading={false}
        />
      </form>
    </div>
  );
};

export default FormComment;
