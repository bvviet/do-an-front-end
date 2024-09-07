import { useEffect, useState } from "react";
import { useModalContext } from "../../../contexts/ModelPopUp/ModelProvider";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";

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
    const [provinces, setProvinces] = useState<OptionType[]>([]);
    const [districts, setDistricts] = useState<OptionType[]>([]);
    const [communes, setCommunes] = useState<OptionType[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(null);
    const [selectedCommune, setSelectedCommune] = useState<OptionType | null>(null);
    console.log("Tinh", selectedProvince?.label, "Huyen", selectedDistrict?.label, "Xa", selectedCommune?.label);

    // Fetch danh sách tỉnh
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get(
                    `https://api.geonames.org/searchJSON?country=VN&featureClass=A&username=bvv1234`
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
                `https://api.geonames.org/childrenJSON?geonameId=${provinceId}&username=bvv1234`
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
                `https://api.geonames.org/childrenJSON?geonameId=${districtId}&username=bvv1234`
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
        <div className="gap-3 bg-[#FAFAFD] p-6 h-full rounded-lg">
            <h2 className="col-span-12 text-[2rem] lg:text-[2.2rem] font-medium leading-[145.455%]">
                Cập nhật địa chỉ
            </h2>
            <form action="" className="gap-8 items-end">
                <div className="grid grid-cols-12 gap-[10px] lg:gap-[20px] items-center">
                    {/* Country */}
                    <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
                        <label htmlFor="province" className="text-[1.8rem] lg:text-[2.2rem] font-medium">
                            Quốc Gia
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] rounded-xl mt-3">
                            <p>Việt Nam</p>
                        </div>
                    </div>

                    {/* Select Province */}
                    <div className="col-span-12 md:col-span-6 w-full lg:w-auto mt-[10px]">
                        <label htmlFor="province" className="text-[1.8rem] lg:text-[2.2rem] font-medium">
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
                        <label htmlFor="district" className="text-[1.8rem] lg:text-[2.2rem] font-medium">
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
                        <label htmlFor="commune" className="text-[1.8rem] lg:text-[2.2rem] font-medium">
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

                    {/* Country */}
                    <div className="col-span-12 lg:w-auto mt-[10px]">
                        <label htmlFor="province" className="text-[1.8rem] lg:text-[2.2rem] font-medium">
                            Địa chỉ cụ thể: số nhà, tên đường
                        </label>
                        <div className="flex items-center px-[12px] border border-solid border-[#d2d1d6] h-[36px] rounded-xl mt-3">
                            <input
                                id="fullName"
                                type="text"
                                placeholder="24a, ngõ 123, Xuân Phương"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-12 gap-[30px] flex items-center justify-end w-full mt-[20px] lg:mt-[40px]">
                    <Link to={"/profile"} className="text-black cursor-pointer hover:opacity-65" onClick={closePopup}>
                        Cancel
                    </Link>
                    <button className="text-black bg-[#FFB700] px-[20px] py-[6px] rounded-[30px] hover:opacity-65">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormUpdateAddress;
