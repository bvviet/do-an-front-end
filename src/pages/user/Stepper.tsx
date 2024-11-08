import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(76,175,80) 0%, rgb(139,195,74) 50%, rgb(205,220,57) 100%)", // Gradient màu xanh lá
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg, rgb(76,175,80) 0%, rgb(139,195,74) 50%, rgb(205,220,57) 100%)", // Gradient màu xanh lá
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0", // Màu đường nối
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; checked?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.completed || ownerState.active ? "#4caf50" : "#b0bec5", // Màu nền icon
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0,0,0,.25)" : "none",
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <HourglassBottomIcon />,
    2: <AssignmentTurnedInIcon />,
    3: <LocalShippingIcon />,
    4: <ShoppingCartCheckoutIcon />,
    5: <HandshakeIcon />,
    6: <ThumbUpIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Chờ xác nhận",
  "Đã Xác Nhận",
  "Đang vận chuyển",
  "Đã giao hàng",
  "Đã nhận",
  "Đơn Hàng Đã Hoàn Thành",
];

interface CustomizedSteppersProps {
  status: string | undefined;
}

const order_status = (sta: string | undefined) => {
  switch (sta) {
    case "pending":
      return 0;
    case "processing":
      return 1;
    case "shipping":
      return 2;
    case "delivered":
      return 3;
    case "received":
      return 4;
    case "completed":
      return 5;
    default:
      return 0;
  }
};

const CustomizedSteppers: React.FC<CustomizedSteppersProps> = ({ status }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={order_status(status)}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default CustomizedSteppers;
