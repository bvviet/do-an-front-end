import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

export const getOrderStatus = (status: string | undefined) => {
  switch (status) {
    case "pending":
      return {
        label: "Chờ xác nhận",
        className: "bg-yellow-200 text-yellow-800 p-3",
        icon: <HourglassBottomIcon color="info" />,
      };
    case "processing":
      return {
        label: "Đã xác nhận",
        className: "bg-blue-200 text-blue-800",
        icon: <PublishedWithChangesIcon color="primary" />,
      };
    case "shipping":
      return {
        label: "Đang vận chuyển",
        className: "bg-green-200 text-[#355137] p-3",
        icon: <LocalShippingIcon color="secondary" />,
      };
    case "delivered":
      return {
        label: "Đã giao hàng",
        className: "bg-green-200 text-green-800 p-3",
        icon: <VerifiedIcon color="success" />,
      };
    case "completed":
      return {
        label: "Đã hoàn thành",
        className: "bg-green-200 text-green-800 p-3",
        icon: <VerifiedIcon color="success" />,
      };
    case "cancelled":
      return {
        label: "Đã hủy",
        className: "bg-red-200 text-red-800 p-3",
        icon: <DeleteIcon color="error" />,
      };
    case "failed":
      return {
        label: "Đã hủy",
        className: "bg-red-200 text-red-800 p-3",
        icon: <DeleteIcon color="error" />,
      };
    default:
      return {
        label: "Không xác định",
        className: "bg-gray-200 text-gray-800 p-3",
        icon: <NotInterestedIcon />,
      };
  }
};
