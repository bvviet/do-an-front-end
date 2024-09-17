import { Rating } from "@mui/material";
import ButtonComponent from "../../../ButtonComponent";
import FormField from "@/components/FormField";
import TextInputs from "@/components/FormInputs/TextInputs";
import { useForm, SubmitHandler } from "react-hook-form";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";

interface dataForm {
  Tile: string;
  comment: string;
}

const FormComment = () => {
  const { control, handleSubmit } = useForm<dataForm>();

  const onSubmit: SubmitHandler<dataForm> = (data) => {
    console.log(data);
  };

  return (
    <div className="ml-auto w-full lg:w-[470px]">
      <div className="mb-[5px] lg:mb-[30px]">
        <h4 className="text-[2rem] font-bold leading-[150%]">
          How would you rate this?
        </h4>
        <Rating
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          size="large"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="flex flex-col gap-[12px]">
          <FormField<dataForm>
            label="Comment"
            name="Tile"
            type="text"
            placeholder="Comment..."
            Component={TextInputs}
            control={control}
            rules={{ required: "Không được bỏ trống." }}
          />
        </div>

        {/* Description */}
        <div className="my-[20px] flex flex-col gap-[12px] lg:my-[30px]">
          <FormField<dataForm>
            label="Write a review"
            name="comment"
            placeholder="Tell us what do you think"
            Component={TextareaInputs}
            control={control}
            rules={{
              required: "Không được bỏ trống",
              minLength: {
                value: 10,
                message: "Không được ít hơn 10 kí tự.",
              },
            }}
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
