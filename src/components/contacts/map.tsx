export default function Map() {
    return <>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:justify-center max-md:w-full max-md:mx-auto max-xl:mx-8 pt-12">
            <div className="flex flex-col">
                <p className="max-md:ml-5 pb-3 font-manrope font-bold">Hà Nội</p>
                <img className="max-md:block max-md:mx-auto max-md:w-[350px]" src="src/images/map.png" alt="" />
            </div>
            <div className="flex flex-col">
                <p className="max-md:ml-5 pb-3 font-manrope font-bold">Hà Nội</p>
                <img className="max-md:block max-md:mx-auto max-md:w-[350px]" src="src/images/map.png" alt="" />
            </div>
        </div>
    </>
}