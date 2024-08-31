import { Button } from "@mui/material";
import { useModalContext } from "../contexts/ModelPopUp/ModelProvider";

const Confirm = () => {
    const { closePopup } = useModalContext();
    return (
        <section className="p-1 w-[220px] sm:w-[350px]">
            <p className="text-[1.6vw] font-bold w-fit">Confirm deletion</p>
            <p className="w-fit text-[1vw] text-slate-500 font-medium mt-4 mb-4 pr-5">
                Lorem ipsum dolor sit amet consectetur elit. Sequi tenetur officiis eveniet iste esse doloremque
            </p>
            <div className="flex items-center justify-end gap-6">
                <Button onClick={closePopup} color="success" variant="outlined">
                    Cancel
                </Button>
                <Button sx={{ background: "red", color: "white" }} variant="contained">
                    Delete
                </Button>
            </div>
        </section>
    );
};
export default Confirm;
