import { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface ButtonComponentProps {
  title: string;
  bg?: string;
  width: string;
  onClick: () => void;
  loading?: boolean;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  title,
  bg = "linear-gradient(to right, #71b1b5, #009688)",
  width = "470px",
  onClick,
  loading,
}) => {
  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={onClick}
      sx={{
        width: width,
        borderRadius: "5px",
        color: "#ffffff",
        py: "13px",
        px: "16px",
        fontSize: "1.7rem",
        fontWeight: "600",
        lineHeight: "1.67",
        transition: "background-color 0.5s ease-in-out, color 0.5s ease-in-out",
        background: bg,
        "&:hover": {
          background: "linear-gradient(to right, #786bdc, #0b6c62)",
          color: "#ffffff", // Màu chữ khi hover, nếu bạn muốn thay đổi
        },
      }}
    >
      {title}
    </LoadingButton>
  );
};

export default ButtonComponent;
