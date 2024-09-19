import React, { useState } from "react"; // Đảm bảo đường dẫn đúng
import "./styles.css";
import InputCode from "@/components/signIn-signUp/inputCode";

const Verify: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="App container">
      <InputCode
        length={6}
        label="Code Label"
        loading={loading}
        onComplete={(code) => {
          setLoading(true);
          console.log("Mã OTP đã nhập:", code);
          setTimeout(() => setLoading(false), 10000);
        }}
      />
    </div>
  );
};

export default Verify;
