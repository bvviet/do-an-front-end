import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import person from "@/assets/icons/account/person.svg";
import trai from "@/assets/icons/account/traidat.svg";
import git from "@/assets/icons/account/github.svg";
import fb from "@/assets/icons/account/fb.svg";
import youtube from "@/assets/icons/account/youtube.svg";
import tiktok from "@/assets/icons/account/tiktok.svg";
import BlogItem from "@/components/blog/blogItem";
import AvatarComponent from "@/components/Avatar";

const Account = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <section className="relative text-[1.4rem]">
        {/* Cover Profile */}
        <div
          className="relative rounded-[16px] bg-[url('https://fullstack.edu.vn/assets/cover-profile-CDYcrPwJ.png')] bg-cover bg-center bg-no-repeat pt-[308px]"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Profile Image and Name */}
          <div className="absolute bottom-[-122px] left-1/2 flex -translate-x-1/2 transform flex-col lg:bottom-[-70px] lg:left-0 lg:ml-[35px] lg:transform-none lg:flex-row lg:items-start lg:justify-start">
            <AvatarComponent
              width="130"
              height="130"
              urlImage="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="mb-[16px] mt-auto flex items-center gap-2 text-center text-xl font-bold sm:text-2xl md:text-3xl lg:ml-4 lg:text-left lg:text-4xl">
              Bàn Văn Việt
              <CheckCircleIcon sx={{ fontSize: 22, color: "#00f" }} />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mt-[110px] grid grid-cols-12 gap-[10px] lg:gap-[30px]">
          <div className="col-span-12 mb-4 md:mb-6 lg:col-span-5">
            <div className="mb-8 break-words rounded-lg bg-white p-[25px] shadow-custom-shadow">
              <h4 className="text-[1.6rem] font-semibold">Introduce</h4>
              <div>
                <div className="border-b border-solid border-[#d0d7de] pb-[15px] pt-[20px] text-center">
                  <span>Stop thinking, start doing!</span>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[18px] w-[16px]">
                    <img src={person} alt="" />
                  </div>
                  <span>
                    Member of
                    <span className="font-semibold">
                      F8 - Học lập trình để đi làm
                    </span>{" "}
                    to get a job 5 years ago
                  </span>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[16px] w-[16px]">
                    <img src={trai} alt="" />
                  </div>
                  <a href="#!" className="text-blue-600 hover:underline">
                    https://fullstack.edu.vn
                  </a>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[16px] w-[16px]">
                    <img src={git} alt="" />
                  </div>
                  <a href="#!" className="text-blue-600 hover:underline">
                    https://github.com/sondnpt00343
                  </a>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[16px] w-[16px]">
                    <img src={fb} alt="" />
                  </div>
                  <a href="#!" className="text-blue-600 hover:underline">
                    https://facebook.com/sondnf8
                  </a>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[16px] w-[16px]">
                    <img src={youtube} alt="" />
                  </div>
                  <a href="#!" className="text-blue-600 hover:underline">
                    https://www.youtube.com/c/F8VNOfficial
                  </a>
                </div>
                {/*  */}
                <div className="flex items-center gap-3 pt-[15px]">
                  <div className="h-[16px] w-[14px]">
                    <img src={tiktok} alt="" />
                  </div>
                  <a href="#!" className="text-blue-600 hover:underline">
                    https://www.youtube.com/c/F8VNOfficial
                  </a>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="mb-5 break-words rounded-lg bg-white p-[25px] shadow-custom-shadow">
              <h4 className="text-[1.6rem] font-semibold">Recent activity</h4>
              <div className="mt-5">
                <p>There have been no recent activities</p>
                <article className="mb-2 mt-6 flex gap-5">
                  <div className="flex-shrink-0">
                    <AvatarComponent
                      width="40"
                      height="40"
                      urlImage="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </div>
                  <div className="border-b border-solid border-[#d0d7de] p-[12px]">
                    <a href="#!" className="font-bold">
                      Bàn Văn Việt
                      <CheckCircleIcon sx={{ fontSize: 15, color: "#00f" }} />
                    </a>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Tempore quo reiciendis quaerat dolorum, facilis
                      voluptatibus sequi mollitia possimus eos eaque.
                    </p>
                  </div>
                </article>
                <article className="mb-2 mt-6 flex gap-5">
                  <div className="h-[45px] w-[45px] flex-shrink-0">
                    <AvatarComponent
                      width="40"
                      height="40"
                      urlImage="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </div>
                  <div className="border-b border-solid border-[#d0d7de] p-[12px]">
                    <a href="#!" className="font-bold">
                      Bàn Văn Việt
                      <CheckCircleIcon sx={{ fontSize: 15, color: "#00f" }} />
                    </a>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Tempore quo reiciendis quaerat dolorum, facilis
                      voluptatibus sequi mollitia possimus eos eaque.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
          {/* Blogs */}
          <div className="col-span-12 mb-4 md:mb-6 lg:col-span-7">
            <div className="mb-5 break-words rounded-lg bg-white p-[25px] shadow-custom-shadow">
              <h4 className="text-[1.6rem] font-semibold">All blogs</h4>
              <div className="mt-5">
                <p>There have been no recent activities</p>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
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
