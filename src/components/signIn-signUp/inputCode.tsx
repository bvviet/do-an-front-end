import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

interface InputCodeProps {
  length: number;
  label: string;
  loading: boolean;
  onComplete: (code: string) => void;
}

const InputCode: React.FC<InputCodeProps> = ({
  length,
  loading,
  onComplete,
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<HTMLInputElement[]>([]);

  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number,
  ) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    if (slot !== length - 1) {
      inputs.current[slot + 1]?.focus(); // Sử dụng optional chaining để kiểm tra null
    }

    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (e.key === "Backspace" && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1]?.focus(); // Sử dụng optional chaining
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex h-full w-[470px] flex-col justify-center border-2 border-black bg-custom-white max-sm:w-full">
          <div className="">
            <p className="login font-manrope text-[40px] font-semibold">
              Verify code
            </p>
            <p className="text-gray-500">
              An authentication code has been sent to your email.
            </p>
            <form>
              <div className="code-input">
                <label className="mb-2 block">Enter code</label>
                <div className="flex space-x-2">
                  {code.map((num, idx) => {
                    return (
                      <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={num}
                        autoFocus={!code[0].length && idx === 0}
                        readOnly={loading}
                        onChange={(e) => processInput(e, idx)}
                        onKeyUp={(e) => onKeyUp(e, idx)}
                        ref={(ref) => {
                          if (ref) {
                            inputs.current[idx] = ref; // Cập nhật ref cho ô nhập
                          }
                        }}
                        className={`h-24 w-24 rounded-md border-2 border-blue-400 bg-transparent text-center text-xl ${loading ? "cursor-not-allowed" : ""}`} // Kiểu dáng
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <p className="text-[14px] font-semibold">
                  Didn’t receive a code?{" "}
                </p>
                <Link
                  to={"/signup"}
                  className="text-[14px] font-semibold text-[#FF8682] hover:text-red-500 hover:underline"
                >
                  Resend?
                </Link>
              </div>
              <button
                type="submit"
                className="block mt-12 w-full rounded-md bg-[#005D63] py-6 text-center text-2xl text-white shadow-sm hover:bg-[#528a8f]"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
        <div>
          <img
            className="h-[720px]"
            src="../src/images/Rectangle 20 (1).png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default InputCode;
