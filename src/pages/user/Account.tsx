import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import person from "../../assets/icons/account/person.svg";
import trai from "../../assets/icons/account/traidat.svg";
import git from "../../assets/icons/account/github.svg";
import fb from "../../assets/icons/account/fb.svg";
import youtube from "../../assets/icons/account/youtube.svg";
import tiktok from "../../assets/icons/account/tiktok.svg";
import BlogItem from "../../components/blog/blogItem";

const Account = () => {
    return (
        <div className="container mx-auto px-4 my-10">
            <section className="relative text-[1.4rem]">
                {/* Cover Profile */}
                <div
                    className="relative bg-cover bg-no-repeat bg-center pt-[308px] rounded-[16px] bg-[url('https://fullstack.edu.vn/assets/cover-profile-CDYcrPwJ.png')]"
                    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    {/* Profile Image and Name */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start absolute bottom-[-122px] lg:bottom-[-70px] lg:left-0 lg:ml-[35px] left-1/2 transform -translate-x-1/2 lg:transform-none">
                        <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] mb-2 lg:mb-0 lg:w-[150px] lg:h-[150px]">
                            <img
                                src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left lg:ml-4 mt-auto mb-[16px] flex items-center gap-2">
                            Bàn Văn Việt
                            <CheckCircleIcon sx={{ fontSize: 22, color: "#00f" }} />
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="mt-[110px] grid grid-cols-12 gap-[10px] lg:gap-[30px] ">
                    <div className="mb-4 md:mb-6 col-span-12 lg:col-span-5">
                        <div className="bg-white shadow-custom-shadow rounded-lg p-[25px] mb-8 break-words">
                            <h4 className="text-[1.6rem] font-semibold">Introduce</h4>
                            <div>
                                <div className="text-center border-b border-solid border-[#d0d7de] pt-[20px] pb-[15px]">
                                    <span>Stop thinking, start doing!</span>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[16px] h-[18px]">
                                        <img src={person} alt="" />
                                    </div>
                                    <span>
                                        Member of
                                        <span className="font-semibold">F8 - Học lập trình để đi làm</span> to get a job
                                        5 years ago
                                    </span>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[16px] h-[16px]">
                                        <img src={trai} alt="" />
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:underline ">
                                        https://fullstack.edu.vn
                                    </a>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[16px] h-[16px]">
                                        <img src={git} alt="" />
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:underline ">
                                        https://github.com/sondnpt00343
                                    </a>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[16px] h-[16px]">
                                        <img src={fb} alt="" />
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:underline ">
                                        https://facebook.com/sondnf8
                                    </a>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[16px] h-[16px]">
                                        <img src={youtube} alt="" />
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:underline ">
                                        https://www.youtube.com/c/F8VNOfficial
                                    </a>
                                </div>
                                {/*  */}
                                <div className="flex items-center gap-3 pt-[15px]">
                                    <div className="w-[14px] h-[16px]">
                                        <img src={tiktok} alt="" />
                                    </div>
                                    <a href="#!" className="text-blue-600 hover:underline ">
                                        https://www.youtube.com/c/F8VNOfficial
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="bg-white shadow-custom-shadow rounded-lg p-[25px] mb-5 break-words">
                            <h4 className="text-[1.6rem] font-semibold">Recent activity</h4>
                            <div className="mt-5">
                                <p>There have been no recent activities</p>
                                <article className="flex gap-5 mb-2 mt-6">
                                    <div className="w-[45px] h-[45px] flex-shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="border-b border-solid border-[#d0d7de] p-[12px]">
                                        <a href="#!" className="font-bold">
                                            Bàn Văn Việt
                                            <CheckCircleIcon sx={{ fontSize: 15, color: "#00f" }} />
                                        </a>
                                        <p>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore quo
                                            reiciendis quaerat dolorum, facilis voluptatibus sequi mollitia possimus eos
                                            eaque.
                                        </p>
                                    </div>
                                </article>
                                <article className="flex gap-5 mb-2 mt-6">
                                    <div className="w-[45px] h-[45px] flex-shrink-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="border-b border-solid border-[#d0d7de] p-[12px]">
                                        <a href="#!" className="font-bold">
                                            Bàn Văn Việt
                                            <CheckCircleIcon sx={{ fontSize: 15, color: "#00f" }} />
                                        </a>
                                        <p>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore quo
                                            reiciendis quaerat dolorum, facilis voluptatibus sequi mollitia possimus eos
                                            eaque.
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="mb-4 md:mb-6 col-span-12 lg:col-span-7">
                        <div className="bg-white shadow-custom-shadow rounded-lg p-[25px] mb-5 break-words">
                            <h4 className="text-[1.6rem] font-semibold">All blogs</h4>
                            <div className="mt-5">
                                <p>There have been no recent activities</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <BlogItem
                                        title={"Blog 1"}
                                        img={
                                            "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        }
                                        date={"06/09/2024"}
                                        author={"Bàn Văn Việt"}
                                    />
                                    <BlogItem
                                        title={"Blog 2"}
                                        img={
                                            "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        }
                                        date={"06/09/2024"}
                                        author={"Bàn Văn Việt"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Account;
