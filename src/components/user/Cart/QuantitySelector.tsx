import { FC, useEffect, useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useUpdateQuantityCartMutation } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
interface QuantitySelectorProps {
  quantityNumber: number;
  idCart: number;
  refetch: () => void;
}
const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantityNumber,
  idCart,
  refetch,
}) => {
  const [updateQuantityCart, { isLoading }] = useUpdateQuantityCartMutation();
  const [quantity, setQuantity] = useState(quantityNumber);
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    const newQuantity = quantity + 1; // Lưu giá trị mới vào biến
    setQuantity(newQuantity); // Cập nhật state
    try {
      const response = await updateQuantityCart({
        cartId: idCart,
        quantity: newQuantity, // Sử dụng giá trị mới
      }).unwrap();
      console.log({ response });
      refetch(); // Gọi refetch sau khi cập nhật thành công
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1; // Lưu giá trị mới vào biến
      setQuantity(newQuantity); // Cập nhật state
      try {
        const response = await updateQuantityCart({
          cartId: idCart,
          quantity: newQuantity, // Sử dụng giá trị mới
        }).unwrap();
        console.log({ response });
        refetch(); // Gọi refetch sau khi cập nhật thành công
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <Box display="flex" alignItems="center">
      <p className="mr-3 text-[18px] font-semibold">Số lượng:</p>
      <IconButton onClick={handleDecrease}>
        <Remove />
      </IconButton>
      <TextField
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{
          min: 1,
          style: { textAlign: "center", padding: "3px 0" },
          inputMode: "numeric",
        }}
        size="small"
        style={{ width: 40 }}
      />
      <IconButton onClick={handleIncrease}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
