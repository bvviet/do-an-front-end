export default function Map() {
    return (
        <>
            <div className="grid container grid-cols-2 gap-6 max-md:grid-cols-1 max-md:justify-center max-md:w-full   pt-12">
                <div className="flex flex-col">
                    <p className="pb-4 font-manrope font-bold">Hà Nội</p>
                    <img
                        className="max-md:block max-md:mx-auto max-md:w-[350px] max-md:h-[240px] w-[560px] h-[383px] object-cover"
                        src="src/images/map.png"
                        alt=""
                    />
                </div>
                <div className="flex flex-col">
                    <p className="pb-4 font-manrope font-bold">Hà Nội</p>
                    <img
                        className="max-md:block max-md:mx-auto max-md:w-[350px] max-md:h-[240px] w-[560px] h-[383px] object-cover"
                        src="src/images/map.png"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}
