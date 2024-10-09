import FormField from "@/components/FormField";
import { useModalContext } from "../../../../contexts/ModelPopUp/ModelProvider";
import TextInputs from "@/components/FormInputs/TextInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileType } from "@/types/profile";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUsersQuery, useUpdateProfileMutation } from "@/services/authApi";
import { useEffect, useState } from "react";
import { saveUserInfo } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserInfor } from "@/hooks/useUserInfor";

const FormUpdateInfo = () => {
  const { closePopup } = useModalContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate schema
  const formSchema = yup.object().shape({
    name: yup.string().required(),
    avatar: yup.mixed(),
    link_fb: yup.string(),
    link_tt: yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileType>({
    resolver: yupResolver(formSchema),
  });
  const getUseUserInfor = useUserInfor();
  const [update, { isSuccess, error, isError }] = useUpdateProfileMutation();
  const { data: users } = useGetUsersQuery(undefined, { skip: !isSuccess });
  console.log({ getUseUserInfor });

  useEffect(() => {
    if (getUseUserInfor) {
      reset({
        name: getUseUserInfor?.name,
        link_fb: getUseUserInfor?.link_fb,
        link_tt: getUseUserInfor?.link_tt,
        // avatar: users.avatar || null,
      });
    }
  }, [getUseUserInfor, reset]);
  const onSubmit: SubmitHandler<ProfileType> = async (formData) => {
    const completeFormData = new FormData();
    completeFormData.append("name", formData.name || "");

    if (selectedFile) {
      completeFormData.append("avatar", selectedFile);
    }

    completeFormData.append("link_fb", formData.link_fb || "");
    completeFormData.append("link_tt", formData.link_tt || "");
    completeFormData.append("_method", "put");

    try {
      const response = await update(completeFormData).unwrap();
      console.log("Profile updated:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (isSuccess && users) {
      dispatch(saveUserInfo(users));
      navigate("/profile");
    }
  }, [dispatch, isSuccess, users, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error occurred:", error); // Kiểm tra chi tiết lỗi
    }
  }, [isError, error]);

  return (
    <div className="grid grid-cols-12 gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-12">
        <h2 className="col-span-12 text-[2.2rem] font-medium leading-[145.455%]">
          Cập nhập thông tin
        </h2>

        <div className="mt-[10px] w-full lg:w-auto">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Chọn ảnh đại diện
          </label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="mt-[10px] w-full lg:w-auto">
          <FormField<ProfileType>
            label="Tên người dùng"
            name="name"
            placeholder="Tên người dùng..."
            Component={TextInputs}
            control={control}
            error={errors.name}
          />
        </div>

        <div className="mt-[20px] w-full lg:w-auto">
          <FormField<ProfileType>
            label="Facebook"
            name="link_fb"
            placeholder="https://facebook.com/username"
            Component={TextInputs}
            control={control}
          />
        </div>

        <div className="mt-[20px] w-full lg:w-auto">
          <FormField<ProfileType>
            label="Tiktok"
            name="link_tt"
            placeholder="https://tiktok.com/@username"
            Component={TextInputs}
            control={control}
          />
        </div>

        <div className="mt-[20px] flex w-full items-center justify-between">
          <div
            className="cursor-pointer text-black hover:opacity-65"
            onClick={closePopup}
          >
            Huỷ
          </div>
          <button type="submit" className="text-black">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdateInfo;
