import social from "@/assets/icons/Social.svg";
export default function DetailBlog() {
    return (
        <>
            <div className="max-w-[969px] mx-auto mt-12">
                <div className="text-center">
                    <h1
                        className="text-[58px] font-slab font-bold mb-4 max-sm:text-[38px]"
                        style={{ lineHeight: "117.241%" }}
                    >
                        Win a Samsung Portable SSD T7 Shield
                    </h1>
                    <small
                        className="font-manrope text-[18px] max-sm:text-[14px] font-normal text-[#566363]"
                        style={{ lineHeight: "171.429%" }}
                    >
                        Sep 2, 2024 | By TienViet
                    </small>
                    <div className="flex items-center justify-center mt-4">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                            alt="Rounded avatar"
                        />
                        <p
                            className="ml-4 text-[18px] font-manrope font-normal"
                            style={{ lineHeight: "166.667%" }}
                        >
                            Tien Viet
                        </p>
                    </div>
                </div>
                {/* end header */}
                <div className="flex justify-center my-16">
                    <img
                    className="rounded-lg"
                        src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg"
                        alt=""
                    />
                </div>
                {/* Text */}
                <div>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        With over 11k contributions, the Travel Topic on Unsplash gets a lot
                        of traffic. It allows for Unsplash users to discover hidden wonders
                        and inspiring destinations around the world from the comfort of
                        their own homes. We are so thankful to these travel photographers
                        for braving crazy heights, dark seas and stormy weather in the name
                        of art. And we are grateful for all the reliable and durable devices
                        that ensure those memories make it home safely.
                    </p>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Samsung Memory supports the superior performance and reliability
                        that you can only get from the world’s number one brand for flash
                        memory since 2003. Samsung products are a perfect partner in any
                        situation, from daily life to a tough environment.
                    </p>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        So we are calling all travel photographers, who are confident in
                        their gear, to submit your best Travel images. The top three images,
                        as chosen by the Samsung Memory team, have the chance to win a
                        Samsung Portable SSD T7 Shield to help keep your photos safe on your
                        next adventure.
                    </p>
                </div>
                {/* img */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Top Row - Two Images with Equal Size */}
                    <div>
                        <img
                            src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg"
                            alt="Image 1"
                            className="w-full max-xl:h-[200px] h-[360px] max-sm:h-[124px] object-cover rounded"
                        />
                    </div>
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                            alt="Image 2"
                            className="w-full max-xl:h-[200px] h-[360px] max-sm:h-[124px] object-cover rounded"
                        />
                    </div>

                    {/* Bottom Row - Two Images with Different Widths */}
                    <div className="col-span-2 flex mb-12">
                        <div className="w-[45%]">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                                alt="Image 3"
                                className="h-[360px] max-xl:h-[200px] max-sm:h-[124px] w-full object-cover rounded"
                            />
                        </div>
                        <div className="w-[55%] ml-4">
                            <img
                                src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg"
                                alt="Image 4"
                                className="h-[360px] max-xl:h-[200px] max-sm:h-[124px] w-full object-cover rounded"
                            />
                        </div>
                    </div>
                </div>
                {/* Text 2 */}
                <div>
                    <h2
                        className="text-[42px] font-slab font-bold mb-4 max-sm:text-[26px]"
                        style={{ lineHeight: "123.81%" }}
                    >
                        Submit to the Travel Topic
                    </h2>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Originally taken to create a time-lapse of the Milky Way rotating
                        over the amazing Spitzkoppe mountains in Namibia, this series of 250
                        images taken over the course of an hour also produced this dramatic
                        star trail image. By accident, the foreground has been lit by the
                        occasional flash of a car headlight in the distance catching the
                        hills. The nature of the southern skies produces a particularly rich
                        spectrum of colour and this is really illustrated in this picture.
                    </p>
                    <p
                        className=" text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Taken using the amazing Sony A1 and equally fantastic Sony 12-24mm
                        F2.8 GM lens and processed using DxO Photolab 5 for the individual
                        images and Affinity Photo for image stacking
                    </p>
                </div>
                <div>
                    <img
                        src="https://www.nomadicmatt.com/wp-content/uploads/2018/04/vietnamguide-2.jpg"
                        className="my-16 rounded"
                        alt=""
                    />
                </div>
                {/* Text 3 */}
                <div>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        With over 11k contributions, the Travel Topic on Unsplash gets a lot
                        of traffic. It allows for Unsplash users to discover hidden wonders
                        and inspiring destinations around the world from the comfort of
                        their own homes. We are so thankful to these travel photographers
                        for braving crazy heights, dark seas and stormy weather in the name
                        of art. And we are grateful for all the reliable and durable devices
                        that ensure those memories make it home safely.
                    </p>
                    <p
                        className=" text-[#566363] font-manrope text-[18px] font-medium pb-6 max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Samsung Memory supports the superior performance and reliability
                        that you can only get from the world’s number one brand for flash
                        memory since 2003. Samsung products are a perfect partner in any
                        situation, from daily life to a tough environment.
                    </p>
                    <p
                        className=" text-[#566363] font-manrope text-[18px] font-medium pb-6 max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        So we are calling all travel photographers, who are confident in
                        their gear, to submit your best Travel images. The top three images,
                        as chosen by the Samsung Memory team, have the chance to win a
                        Samsung Portable SSD T7 Shield to help keep your photos safe on your
                        next adventure.
                    </p>
                </div>
                {/* Text 4 */}
                <div>
                    <h2
                        className="text-[42px] font-slab font-bold my-4 max-sm:text-[26px]"
                        style={{ lineHeight: "123.81%" }}
                    >
                        How do Topics work?
                    </h2>
                    <p
                        className="pb-6 text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Topics work as a way to curate various images on our platform through a similar theme. From topics like the aforementioned Travel Topic, to Current Events — curated topics have an increased chance of being featured, promoted, or seen on the site.

                    </p>
                    <p
                        className=" text-[#566363] font-manrope text-[18px] font-medium max-sm:text-[14px]"
                        style={{ lineHeight: "166.667%" }}
                    >
                        Curious to partner with us on a topic? Reach out, we’d love to make magic happen
                    </p>
                </div>
                {/* item contacts */}
                <div className="text-center items-center my-24">
                    <h3 className="font-bold text-[20px] leading-[150%]">Share article</h3>
                    <ul className="mt-[10px] flex justify-center text-[#A6B6B6]">
                        <li className="py-[8px] cursor-pointer">
                            <img src={social} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
