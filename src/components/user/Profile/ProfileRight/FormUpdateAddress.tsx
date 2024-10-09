import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { addressType } from "@/types/address";
import { useCreateAddressMutation, useGetUsersQuery } from "@/services/authApi";
import { saveUserInfo } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface OptionType {
  value: string;
  label: string;
}

interface ProvinceType {
  geonameId: string;
  toponymName: string;
}

interface DistrictType {
  geonameId: string;
  toponymName: string;
}

interface CommuneType {
  geonameId: string;
  toponymName: string;
}

const FormUpdateAddress = () => {
  const { closePopup } = useModalContext();
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [communes, setCommunes] = useState<OptionType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(
    null,
  );
  const [selectedCommune, setSelectedCommune] = useState<OptionType | null>(
    null,
  );

  // Fetch danh sách tỉnh
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?country=VN&featureClass=A&username=${
            import.meta.env.VITE_GEONAMES_USERNAME
          }`,
        );
        const data = response.data;
        const mappedProvinces = data.geonames.map((province: ProvinceType) => ({
          value: province.geonameId,
          label: province.toponymName,
        }));
        setProvinces(mappedProvinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch danh sách huyện khi chọn tỉnh
  const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await axios.get(
        `http://api.geonames.org/childrenJSON?geonameId=${provinceId}&username=${
          import.meta.env.VITE_GEONAMES_USERNAME
        }`,
      );
      const data = response.data;
      const mappedDistricts = data.geonames.map((district: DistrictType) => ({
        value: district.geonameId,
        label: district.toponymName,
      }));
      setDistricts(mappedDistricts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  // Fetch danh sách xã khi chọn huyện
  const fetchCommunes = async (districtId: string) => {
    try {
      const response = await axios.get(
        `http://api.geonames.org/childrenJSON?geonameId=${districtId}&username=${
          import.meta.env.VITE_GEONAMES_USERNAME
        }`,
      );
      const data = response.data;
      const mappedCommunes = data.geonames.map((commune: CommuneType) => ({
        value: commune.geonameId,
        label: commune.toponymName,
      }));
      setCommunes(mappedCommunes);
    } catch (error) {
      console.error("Error fetching communes:", error);
    }
  };

  const handleProvinceChange = (selectedOption: OptionType | null) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null); // Reset huyện khi chọn tỉnh
    setSelectedCommune(null); // Reset xã khi chọn tỉnh
    if (selectedOption) {
      fetchDistricts(selectedOption.value); // Gọi API để lấy huyện
    }
  };

  const handleDistrictChange = (selectedOption: OptionType | null) => {
    setSelectedDistrict(selectedOption);
    setSelectedCommune(null); // Reset xã khi chọn huyện
    if (selectedOption) {
      fetchCommunes(selectedOption.value); // Gọi API để lấy xã
    }
  };

  const handleCommuneChange = (selectedOption: OptionType | null) => {
    setSelectedCommune(selectedOption);
  };

  const [createAddress, { isSuccess, error }] = useCreateAddressMutation();

  const { register, handleSubmit } = useForm<addressType>();
  // const token = useSelector((state: RootState) => state.auth.access_token);
  const onSubmit: SubmitHandler<addressType> = async (data) => {
    try {
      // Gọi hàm createAddress và đợi kết quả
     await createAddress({
        address_name: data.address_name,
        detail_address: data.detail_address,
        ward: selectedCommune?.label,
        district: selectedDistrict?.label,
        city: selectedProvince?.label,
        phone_number: data.phone_number,
      });
      // const res = await axios.post(
      //   "http://127.0.0.1:8000/api/addresses",
      //   {
      //     address_name: data.address_name,
      //     detail_address: data.detail_address,
      //     ward: selectedCommune?.label,
      //     district: selectedDistrict?.label,
      //     city: selectedProvince?.label,
      //     phone_number: data.phone_number,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`, // Gắn Bearer token vào header
      //     },
      //   },
      // );
      // // Log kết quả trả về từ createAddress
      // console.log({ res });

      // Thực hiện các hành động cần thiết sau khi tạo địa chỉ thành công
      // Ví dụ, thông báo cho người dùng hoặc điều hướng đến trang khác
    } catch (error) {
      // Xử lý lỗi
      toast.error(
        (error as { data?: { message?: string } }).data?.message ||
          "Đã xảy ra lỗi không xác định.",
      );
      console.error("Error creating address:", error);

      // Bạn có thể hiển thị thông báo lỗi cho người dùng
      // Hoặc xử lý lỗi theo cách phù hợp với ứng dụng của bạn
      alert("Có lỗi xảy ra trong quá trình tạo địa chỉ. Vui lòng thử lại.");
    }
  };

  console.log({ error });

  // Gọi query người dùng chỉ khi đăng nhập thành công
  const { data: users } = useGetUsersQuery(undefined, { skip: !isSuccess });

  useEffect(() => {
    if (isSuccess && users) {
      dispatch(saveUserInfo(users));
    }
  }, [dispatch, isSuccess, users]);

  return (
    <div className="h-full gap-3 rounded-lg">
      <h2 className="col-span-12 text-[2rem] font-medium leading-[145.455%] lg:text-[2.2rem]">
        Cập nhật địa chỉ
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="items-end gap-8">
        <div className="grid grid-cols-12 items-center gap-[10px] lg:gap-[20px]">
          {/* Country */}
          <div className="col-span-12 mt-[10px] w-full md:col-span-6 lg:w-auto">
            <label
              htmlFor="province"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Quốc Gia
            </label>
            <div className="mt-3 flex h-[36px] items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px]">
              <p>Việt Nam</p>
            </div>
          </div>

          {/* Select Province */}
          <div className="col-span-12 mt-[10px] w-full md:col-span-6 lg:w-auto">
            <label
              htmlFor="province"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Tỉnh / Thành phố
            </label>

            <Select
              options={provinces}
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="mt-3 w-full"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Select District */}

          <div className="col-span-12 mt-[10px] w-full md:col-span-6 lg:w-auto">
            <label
              htmlFor="district"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Quận / Huyện
            </label>

            <Select
              options={districts}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="mt-3 w-full"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Select Commune */}

          <div className="col-span-12 mt-[10px] w-full md:col-span-6 lg:w-auto">
            <label
              htmlFor="commune"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Xã / Phường
            </label>

            <Select
              options={communes}
              value={selectedCommune}
              onChange={handleCommuneChange}
              className="mt-3 w-full"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Country */}
          <div className="col-span-12 mt-[10px] lg:w-auto">
            <label
              htmlFor="province"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Địa chỉ cụ thể: số nhà, tên đường
            </label>
            <div className="mt-3 flex h-[36px] items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px]">
              <input
                id="fullName"
                type="text"
                placeholder="24a, ngõ 123, Xuân Phương"
                className="w-full"
                {...register("detail_address")}
              />
            </div>
          </div>

          <div className="col-span-12 mt-[10px] lg:w-auto">
            <label
              htmlFor="province"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Văn Phòng, nhà riêng
            </label>
            <div className="mt-3 flex h-[36px] items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px]">
              <select {...register("address_name")}>
                <option value="">Chọn văn phòng, nhà riêng</option>
                <option value="Nhà riêng">Nhà riêng</option>
                <option value="Văn phòng">Văn phòng</option>
              </select>
            </div>
          </div>

          <div className="col-span-12 mt-[10px] lg:w-auto">
            <label
              htmlFor="province"
              className="text-[1.8rem] font-medium lg:text-[2.2rem]"
            >
              Số điện thoại
            </label>
            <div className="mt-3 flex h-[36px] items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px]">
              <input type="text" {...register("phone_number")} />
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-[20px] flex w-full items-center justify-end gap-[30px] lg:mt-[40px]">
          <Link
            to={"/profile/addresses"}
            className="cursor-pointer text-black hover:opacity-65"
            onClick={closePopup}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-[30px] bg-[#FFB700] px-[20px] py-[6px] text-black hover:opacity-65"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdateAddress;
