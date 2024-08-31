
export default function Featured() {
    return <>
        <div>
            <h1 className="font-slab font-bold text-[42px] max-sm:text-[28px] text-[#131717] my-32 hover:underline" style={{ lineHeight: "123.81%" }}>Featured</h1>
            <div className="grid grid-cols-2 gap-12 max-sm:gap-6 mx-auto ">
                <div className="max-w-[540px]">
                    <img src="https://unidesign.edu.vn/wp-content/uploads/2021/02/hand-painted-fashion-women_23-2147492196_0.jpg" alt="" className="h-[395px]  max-lg:h-[300px] max-sm:h-[187px] object-cover" />
                    <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>30 type of modern trendy fashion for women and men in 2022 worlwide</span><br />
                    <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>July 7, 2022 | By Warner</small>
                </div>
                <div className="max-w-[540px]">
                    <img src="https://baobinhduong.vn/image/news/2015/20151222/fckimage/t4tu.jpg" alt="" className="h-[395px]  max-lg:h-[300px] max-sm:h-[187px] object-cover" />
                    <span className="font-manrope text-[#131717] text-[20px] font-bold max-sm:text-[14px]" style={{ lineHeight: "150%" }}>30 type of modern trendy fashion for women and men in 2022 worlwide</span><br />
                    <small className="font-manrope text-[14px] max-sm:text-[10px] font-normal text-[#566363]" style={{ lineHeight: "171.429%" }}>July 7, 2022 | By Warner</small>
                </div>
            </div>
        </div>
    </>
}