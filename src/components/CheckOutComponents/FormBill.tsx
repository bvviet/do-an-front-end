import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useUserInfor } from "@/hooks/useUserInfor";

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

const FormBill = () => {
  const [provinces, setProvinces] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [communes, setCommunes] = useState<OptionType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(
    null
  );
  const [selectedCommune, setSelectedCommune] = useState<OptionType | null>(
    null
  );
  console.log(import.meta.env.VITE_GEONAMES_USERNAME);
  const userInfor = useUserInfor();
  const userInfoDefault = userInfor?.addresses.find(add => add.is_default === true);
  console.log("Đây là userDefaut", userInfoDefault);
  console.log("Đây là user", userInfor);

  // Thiết lập thông tin người dùng
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("")

  useEffect(() => {
    if (userInfor) {
      setEmail(userInfor.email || "");
      setName(userInfor.name || "");
      setPhone(userInfoDefault?.phone_number || ""); // Lấy số điện thoại từ địa chỉ mặc định
      setDetailAddress(userInfoDefault?.detail_address || ""); // Lấy số điện thoại từ địa chỉ mặc định
     
    }
  }, [userInfor, userInfoDefault]);
  console.log(userInfor);
  // Fetch danh sách tỉnh
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?country=VN&featureClass=A&username=${import.meta.env.VITE_GEONAMES_USERNAME
          }`
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
        `http://api.geonames.org/childrenJSON?geonameId=${provinceId}&username=${import.meta.env.VITE_GEONAMES_USERNAME
        }`
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
        `http://api.geonames.org/childrenJSON?geonameId=${districtId}&username=${import.meta.env.VITE_GEONAMES_USERNAME
        }`
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

  return (
    <div className="gap-3 h-full rounded-lg">
      <h2 className="col-span-12 text-[2rem] lg:text-[2.8rem] font-medium leading-[145.455%]">
        Thông tin giao hàng
      </h2>
      <form action="" className="gap-8 items-end">
        {/* email */}
        <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
          <label
            htmlFor="Email"
            className="text-[1.8rem] lg:text-[1.8rem] font-medium"
          >
            Email
          </label>
          <input value={email} className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] w-full rounded-xl mt-3 bg-white" />
        </div>
        {/* Ho ten */}
        <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
          <label
            htmlFor="name"
            className="text-[1.8rem] lg:text-[1.8rem] font-medium"
          >
            Họ và tên
          </label>
          <input value={name} className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] w-full rounded-xl mt-3 bg-white" />
        </div>
        <div className="grid grid-cols-12 gap-[10px] lg:gap-[20px] items-center">
          {/* Country */}
          <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
            <label
              htmlFor="province"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Quốc Gia
            </label>
            <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] rounded-xl mt-3 bg-white">
              <p>Việt Nam</p>
            </div>
          </div>

          {/* Select Province */}
          <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
            <label
              htmlFor="province"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Tỉnh / Thành phố
            </label>

            <Select
              options={provinces}
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full mt-3"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Select District */}

          <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
            <label
              htmlFor="district"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Quận / Huyện
            </label>

            <Select
              options={districts}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full mt-3"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Select Commune */}

          <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
            <label
              htmlFor="commune"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Xã / Phường
            </label>

            <Select
              options={communes}
              value={selectedCommune}
              onChange={handleCommuneChange}
              className="w-full mt-3"
              getOptionLabel={(option: OptionType) => option.label}
              getOptionValue={(option: OptionType) => option.value}
            />
          </div>

          {/* Phone number */}
          <div className="col-span-12 lg:w-auto mt-[10px]">
            <label
              htmlFor="phone"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Số điện thoại
            </label>
            <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] rounded-xl mt-3 bg-white">
              <input value={phone} id="phone" type="number" className="w-full" />
            </div>
          </div>
          {/* Country */}
          <div className="col-span-12 lg:w-auto mt-[10px]">
            <label
              htmlFor="province"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Địa chỉ cụ thể: số nhà, tên đường
            </label>
            <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] rounded-xl mt-3 bg-white">
              <input
                id="fullName"
                type="text"
                value={detailAddress}
                placeholder="24a, ngõ 123, Xuân Phương"
                className="w-full"
              />
            </div>
          </div>
          {/* note */}
          <div className="col-span-12 lg:w-auto mt-[10px]">
            <label
              htmlFor="province"
              className="text-[1.8rem] lg:text-[1.8rem] font-medium"
            >
              Ghi chú
            </label>
            <div>
              <textarea
                className="flex items-center px-[12px] border border-solid border-[#d2d1d6] w-full  rounded-xl mt-3 bg-white"
                placeholder="Nói cho tôi điều bạn muốn"
                rows={6}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormBill;
