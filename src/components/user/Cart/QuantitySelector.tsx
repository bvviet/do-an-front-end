import { FC, useEffect, useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useUpdateQuantityCartMutation } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { toast } from "react-toastify";

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
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    try {
      const response = await updateQuantityCart({
        cartId: idCart,
        quantity: newQuantity,
      }).unwrap();
      console.log({ response });
      refetch();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      try {
        const response = await updateQuantityCart({
          cartId: idCart,
          quantity: newQuantity,
        }).unwrap();
        console.log({ response });
        refetch();
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
      <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
        <Remove />
      </IconButton>
      <TextField
        value={quantity}
        inputProps={{
          readOnly: true,
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
