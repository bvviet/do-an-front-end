import Featured from "./feartured";

export default function BlogCompoment() {
    return <>
        <div className="">
            <Featured />
            <div className="">
                <h1 className="font-slab font-bold text-[42px] max-sm:text-[28px] text-[#131717] py-32  hover:underline" style={{ lineHeight: "123.81%" }}>Latest from the team</h1>
                <div className="grid grid-cols-3 gap-12 max-sm:gap-6 max-sm:grid-cols-2 mx-auto ">
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9, 2024 | By TienViet</small>
                    </div>
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9 , 2024 | By TienViet</small>
                    </div>
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9 , 2024 | By TienViet</small>
                    </div>
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9 , 2024 | By TienViet</small>
                    </div>
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9 , 2024 | By TienViet</small>
                    </div>
                    <div className="">
                        <img src="https://hadong.hanoi.gov.vn/SiteAssets/Lists/NewsList/AllItems/treo%20co%20to%20quoc%20QK%202921.jpg" alt="" className="h-[247px]  max-sm:h-[187px] object-cover" />
                        <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>Kỉ niệm ngày 2/9</span><br />
                        <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>Sep 9 , 2024 | By TienViet</small>
                    </div>

                </div>
                <div className="w-full flex justify-center mt-[80px] max-lg:mt-[52px]">
                    <button type="button" className=" flex justify-center  text-white bg-[#005D63] hover:bg-[#274b4f] rounded text-[18px] max-md:text-[14px] font-semibold px-[32px] py-4  mb-2" style={{ lineHeight: "166.67%" }}>Load more</button>
                </div>
            </div>
        </div>
    </>
}