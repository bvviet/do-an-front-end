import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { Button } from "@mui/material";

// Định nghĩa kiểu cho các props
interface ConfirmProps {
  title?: string;
  description?: string;
  handleDelete: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({
  title = "Bạn chắc chắn",
  description = "Bạn có chắc chắn muốn xóa mục này không? Hành động này sẽ không thể khôi phục.",
  handleDelete,
}) => {
  const { closePopup } = useModalContext();

  const handleDeleteClick = () => {
    handleDelete();
    closePopup();
  };

  return (
    <section className="w-fit rounded-lg py-8">
      <div className="mx-auto sm:max-w-[86%] text-center">
        <p className="mb-2 text-center text-[2rem] font-semibold">{title}?</p>
        <p className="mx-auto mb-10 text-[1.5rem] text-gray-600 font-medium">{description}</p>
      </div>
      <div className="flex justify-end gap-[6%]">
        <Button
          onClick={closePopup}
          color="primary"
          variant="outlined"
          sx={{ borderColor: "gray", color: "gray" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteClick}
          sx={{ backgroundColor: "red", color: "white" }}
          variant="contained"
        >
          Delete
        </Button>
      </div>
    </section>
  );
};

export default Confirm;
