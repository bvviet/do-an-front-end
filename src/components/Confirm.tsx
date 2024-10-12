import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { Button } from "@mui/material";

// Định nghĩa kiểu cho các props
interface ConfirmProps {
  title?: string;
  description?: string;
  titleButton: string;
  handleDelete: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({
  title = "Bạn chắc chắn",
  titleButton,
  description = "Bạn có chắc chắn muốn thực hiện hành động này không này không? Hành động này sẽ không thể khôi phục.",
  handleDelete,
}) => {
  const { closePopup } = useModalContext();

  const handleDeleteClick = () => {
    handleDelete();
    closePopup();
  };

  return (
    <section className="w-fit rounded-lg py-8">
      <div className="mx-auto text-center sm:max-w-[86%]">
        <p className="mb-2 text-center text-[2rem] font-semibold">{title}?</p>
        <p className="mx-auto mb-10 text-[1.5rem] font-medium text-gray-600">
          {description}
        </p>
      </div>
      <div className="flex justify-end gap-[6%]">
        <Button
          onClick={closePopup}
          color="primary"
          variant="outlined"
          sx={{ borderColor: "gray", color: "gray" }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleDeleteClick}
          sx={{ backgroundColor: "red", color: "white" }}
          variant="contained"
        >
          {titleButton}
        </Button>
      </div>
    </section>
  );
};

export default Confirm;
