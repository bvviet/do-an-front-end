import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteIcon from "@mui/icons-material/Delete";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
interface OrderStatus {
  label: string;
  className: string;
  icon: JSX.Element;
}

export const getOrderStatus = (status: string | undefined): OrderStatus => {
  switch (status) {
    case "pending":
      return {
        label: "Chờ xác nhận",
        className: "bg-yellow-50 text-yellow-700 border border-yellow-300 p-3",
        icon: <HourglassBottomIcon color="warning" />,
      };
    case "processing":
      return {
        label: "Đã xác nhận",
        className: "bg-blue-50 text-blue-700 border border-blue-300 p-3",
        icon: <PublishedWithChangesIcon color="primary" />,
      };
    case "shipping":
      return {
        label: "Đang vận chuyển",
        className: "bg-orange-50 text-orange-700 border border-orange-300 p-3",
        icon: <LocalShippingIcon color="secondary" />,
      };
    case "delivered":
      return {
        label: "Đã giao hàng",
        className: "bg-green-50 text-green-700 border border-green-300 p-3",
        icon: <VerifiedIcon color="success" />,
      };
    case "completed":
      return {
        label: "Đã hoàn thành",
        className: "bg-teal-50 text-teal-700 border border-teal-300 p-3",
        icon: <VerifiedIcon color="success" />,
      };
    case "cancelled":
      return {
        label: "Đã hủy",
        className: "bg-red-50 text-red-700 border border-red-300 p-3",
        icon: <DeleteIcon color="error" />,
      };
    case "failed":
      return {
        label: "Thất bại",
        className: "bg-gray-50 text-gray-700 border border-gray-300 p-3",
        icon: <NotInterestedIcon color="disabled" />,
      };
    default:
      return {
        label: "Không xác định",
        className: "bg-gray-200 text-gray-800 p-3",
        icon: <NotInterestedIcon />,
      };
  }
};
