import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { Button } from "@mui/material";

// Định nghĩa kiểu cho các props
interface ConfirmProps {
    title?: string;
    description?: string;
    handleDelete: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({
    title = "Confirm deletion",
    description = "Are you sure you want to delete this?",
    handleDelete,
}) => {
    const { closePopup } = useModalContext();

    const handleDeleteClick = () => {
        handleDelete();
        closePopup();
    };

    return (
        <section className="p-1 w-[220px] sm:w-[350px]">
            <p className="text-[1.6vw] font-bold w-fit">{title}📢</p>
            <p className="w-fit text-[1vw] text-slate-500 font-medium mt-4 mb-4 pr-5">{description}</p>
            <div className="flex items-center justify-end gap-6">
                <Button onClick={closePopup} color="success" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleDeleteClick} sx={{ background: "red", color: "white" }} variant="contained">
                    Delete
                </Button>
            </div>
        </section>
    );
};

export default Confirm;
