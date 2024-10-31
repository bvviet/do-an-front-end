// DateFilter.tsx
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";

interface DateFilterProps {
  onFilter: (range: DateRange<Dayjs>) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);

  const handleDateChange = (newValue: DateRange<Dayjs>) => {
    setSelectedDateRange(newValue);
    onFilter(newValue); // Gọi hàm onFilter khi giá trị thay đổi
  };

  const handleClear = () => {
    const resetValue: DateRange<Dayjs> = [null, null];
    setSelectedDateRange(resetValue);
    onFilter(resetValue); // Gọi hàm onFilter với giá trị null để xóa bộ lọc
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          <DateRangePicker
            value={selectedDateRange}
            onChange={handleDateChange}
            localeText={{ start: "Từ ngày", end: "Đến ngày" }}
          />
          <Button onClick={handleClear} variant="outlined" color="secondary">
            Chọn lại
          </Button>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DateFilter;
