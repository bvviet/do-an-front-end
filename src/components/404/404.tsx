import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <div className="h-screen w-screen bg-gray-50 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
                    <div className="w-full lg:w-1/2 mx-8 max-sm:flex max-sm:flex-col max-sm:items-center">
                        <div className="text-9xl text-[#005D63] font-dark font-extrabold mb-8">
                            {" "}
                            404
                        </div>
                        <p className="text-2xl md:text-3xl font-light leading-normal mb-8 max-sm:text-center">
                            Sorry we couldn't find the page you're looking for
                        </p>

                        <Link
                            to={"/"}
                            className="px-9 inline py-5 text-xl font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-[#005D63] active:bg-red-600 hover:bg-red-700"
                        >
                            Back to homepage
                        </Link>
                    </div>
                    <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                        <img
                            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                            alt="Page not found"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
