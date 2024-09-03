import People from "./people";

export default function ItemAbout() {
    return (
        <>
            <div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center my-24">
                    <div>
                        <img src="https://images.vietnamtourism.gov.vn/vn/images/2019/CNMN/19.5._Dep_me_man_canh_dep_Viet_Nam_1.jpg" alt="" className="w-[548px] h-[493px] max-sm:size-auto object-cover" />
                    </div>
                    <div className="w-[570px] max-xl:w-full">
                        <h3 className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]" style={{ lineHeight: "123.81%" }}>WHO WE ARE</h3>
                        <p className="py-12 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal" style={{ lineHeight: "166.67%" }}>
                            Proin gravida nibh vel velit auctor aliquet. Aenean sollicudin,
                            lorem quis biben dum auctor, nisi elit consequat ipsum, nec
                            sagittis sem nibh id elit. Duis sed odio sit amet nibh vultate
                            cursus a sit amet mauris. Proin gravida nibh vel velit auctor
                            aliquet. Aenean sollicudin, lorem quis bibendum auctor, nisi elit
                            conse quat ipsum, nec sagit tis sem nibh id elit. Duis sed odio
                            sit amet nibh vultate cursus a sit amet mauris.
                        </p>
                        <p className="text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal" style={{ lineHeight: "166.67%" }}>
                            Proin gravida nibh vel velit auctor aliquet. Aenean sollicudin,
                            lorem quis bibendum auctor, nisi elit consequat ipsum, nec
                            sagittis sem nibh id elit. Duis sed odio sit amet nibh vultate
                            cursus a sit amet mauris.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center my-24">
                    <div className="w-[570px] max-xl:w-full">
                        <h3 className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]" style={{ lineHeight: "123.81%" }}>WHO WE ARE</h3>
                        <p className="py-12 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal" style={{ lineHeight: "166.67%" }}>
                            Proin gravida nibh vel velit auctor aliquet. Aenean sollicudin,
                            lorem quis biben dum auctor, nisi elit consequat ipsum, nec
                            sagittis sem nibh id elit. Duis sed odio sit amet nibh vultate
                            cursus a sit amet mauris. Proin gravida nibh vel velit auctor
                            aliquet. Aenean sollicudin, lorem quis bibendum auctor, nisi elit
                            conse quat ipsum, nec sagit tis sem nibh id elit. Duis sed odio
                            sit amet nibh vultate cursus a sit amet mauris.
                        </p>
                        <p className="text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal" style={{ lineHeight: "166.67%" }}>
                            Proin gravida nibh vel velit auctor aliquet. Aenean sollicudin,
                            lorem quis bibendum auctor, nisi elit consequat ipsum, nec
                            sagittis sem nibh id elit. Duis sed odio sit amet nibh vultate
                            cursus a sit amet mauris.
                        </p>
                    </div>
                    <div>
                        <img src="https://vcdn1-dulich.vnecdn.net/2020/04/16/anh-dat-giai-Sony-1-1587009848.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=O7hu1g2gFA3caVMjCv_kxQ" alt="" className="w-[548px] h-[493px] max-sm:size-auto object-cover" />
                    </div>
                </div>
                {/* Avatar */}
                <div className="flex">
                    <div className="w-[45%] max-md:w-full">
                        <h3 className="font-slab text-[42px] max-lg:text-[28px] font-bold text-[#131717]" style={{ lineHeight: "123.81%" }}>MEET OUR TEAM</h3>
                        <p className="py-12 text-[18px] max-lg:text-[14px] text-[#131717] font-manrope font-normal" style={{ lineHeight: "166.67%" }}>
                            Cosmo lacus meleifend menean diverra loremous. Nullam sit amet orci rutrum risus laoreet semper vel non magna. Mauris vel sem a lectus vehicula ultricies. Etiam semper sollicitudin lectus indous scelerisque.
                        </p>
                    </div>
                </div>
                <People />
            </div>
        </>
    );
}
