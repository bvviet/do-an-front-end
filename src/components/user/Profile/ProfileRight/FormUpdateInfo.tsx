import FormField from "@/components/FormField";
import { useModalContext } from "../../../../contexts/ModelPopUp/ModelProvider";
import TextInputs from "@/components/FormInputs/TextInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileResponseError, ProfileType } from "@/types/profile";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUsersQuery, useUpdateProfileMutation } from "@/services/authApi";
import { useEffect, useState } from "react";
import { saveUserInfo } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "@/redux/slices/loadingSlice";

const FormUpdateInfo = () => {
  const { closePopup } = useModalContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validate schema
  const formSchema = yup.object().shape({
    name: yup.string().required("Tên không được bỏ trống"),
    avatar: yup.mixed(),
    link_fb: yup.string().url("Đường dẫn Facebook không hợp lệ"),
    link_tt: yup.string().url("Đường dẫn TikTok  không hợp lệ"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileType>({
    resolver: yupResolver(formSchema),
  });

  const [update, { data, isLoading: loadingUpdate, isSuccess }] =
    useUpdateProfileMutation();
  const {
    data: user,
    isLoading: loadingGetUser,
    refetch,
  } = useGetUsersQuery(undefined);

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        link_fb: user?.link_fb,
        link_tt: user?.link_tt,
        // avatar: getUseUserInfor.avatar || null,
      });
    }
  }, [user, reset]);

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
      await update([completeFormData, user?.id]).unwrap();
      // Refetch dữ liệu ngay sau khi update thành công
      await refetch();
    } catch (error) {
      const customError = error as ProfileResponseError;
      toast.error(customError?.data?.message);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    dispatch(setLoading(loadingGetUser || loadingUpdate));
    if (isSuccess) {
      toast.success(data?.message);
      if (user) {
        dispatch(saveUserInfo(user));
      }
      navigate("/profile");
    }
  }, [
    isSuccess,
    user,
    dispatch,
    navigate,
    loadingUpdate,
    loadingGetUser,
    data?.message,
  ]);

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
            error={errors.link_fb}
          />
        </div>

        <div className="mt-[20px] w-full lg:w-auto">
          <FormField<ProfileType>
            label="Tiktok"
            name="link_tt"
            placeholder="https://tiktok.com/@username"
            Component={TextInputs}
            control={control}
            error={errors.link_tt}
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
