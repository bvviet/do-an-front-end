import FormField from "@/components/FormField";
import { useModalContext } from "../../../../contexts/ModelPopUp/ModelProvider";
import ProfileImageUpload from "./ProfileImageUpload";
import TextInputs from "@/components/FormInputs/TextInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileType } from "@/types/profile";
import ButtonComponent from "@/components/ButtonComponent";

const FormUpdateInfo = () => {
  const { closePopup } = useModalContext();
  const { control, handleSubmit } = useForm<ProfileType>();

  const onSubmit: SubmitHandler<ProfileType> = async (formData) => {
    console.log(formData);
  };
  return (
    <div className="grid grid-cols-12 gap-3 bg-[#FAFAFD] p-5 lg:w-[390px]">
      <h2 className="leading-[145.455% ] col-span-12 text-[2.2rem] font-medium">
        Update info
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-12">
        {/* Form row 1 */}
        <div className="gap-[20px]">
          {/* Avatar */}
          <div className="mt-[10px] w-full lg:w-auto">
            <label htmlFor="fullName" className="text-[2.2rem] font-medium">
              Ảnh đại diện
            </label>
            <ProfileImageUpload />
          </div>
          {/* Full name */}
          <div className="mt-[10px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="User Name"
              name="fullName"
              placeholder="username..."
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 3 kí tự.",
                },
              }}
            />
          </div>
          <div className="mt-[20px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="Email"
              name="email"
              placeholder="admin@uihut.com"
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 3 kí tự.",
                },
              }}
            />
          </div>
        </div>

        {/* Form row 1 */}
        <div className="flex-col flex-wrap gap-[30px] lg:flex-row">
          <div className="mt-[20px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="Số điện thoại"
              name="phone"
              placeholder="+008 01234 56789"
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 10 kí tự.",
                },
              }}
            />
          </div>
          <div className="mt-[20px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="Mật khẩu"
              name="password"
              placeholder="•••••••••"
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 3 kí tự.",
                },
              }}
            />
          </div>
        </div>
        {/* Social */}
        <div className="gap-[20px]">
          {/* Personal websites */}
          <div className="mt-[10px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="Facebook"
              name="facebook"
              placeholder="https://facebook.com/username."
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 3 kí tự.",
                },
              }}
            />
          </div>
          <div className="mt-[20px] w-full lg:w-auto">
            <FormField<ProfileType>
              label="Tiktok"
              name="tiktok"
              placeholder="https://tiktok.com/@username"
              Component={TextInputs}
              control={control}
              rules={{
                required: "Không được bỏ trống",
                minLength: {
                  value: 3,
                  message: "Không được ít hơn 3 kí tự.",
                },
              }}
            />
          </div>
        </div>
        <div className="mt-[20px] flex w-full items-center justify-between">
          <div
            className="cursor-pointer text-black hover:opacity-65"
            onClick={closePopup}
          >
            Cancel
          </div>
          <ButtonComponent
            title="Lưu"
            width="20%"
            onClick={handleSubmit(onSubmit)}
            loading={false}
          />
        </div>
      </form>
    </div>
  );
};
export default FormUpdateInfo;
