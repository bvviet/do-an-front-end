import { useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <p className="text-[18px] font-semibold mr-3">Số lượng:</p>
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
