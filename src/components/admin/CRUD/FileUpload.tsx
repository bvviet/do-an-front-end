import React, { useState } from "react";

const FileUploadPreview: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files); // Chuyển từ FileList sang Array
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

      // Tạo URL để hiển thị ảnh cho từng file
      const fileUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...fileUrls]);
    }
  };

  // Xử lý khi xóa ảnh
  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-center px-7">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple // Cho phép chọn nhiều file
          />
        </label>
      </div>

      {/* Hiển thị ảnh xem trước và nút xóa cho từng ảnh */}
      <div className="mt-4 grid grid-cols-3 gap-4 pl-7">
        {previewUrls.map((url, index) => (
          <div key={index} className="flex items-center">
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="mr-4 h-32 w-32 object-cover"
            />
            <div className="">
              <button
                onClick={() => handleRemoveImage(index)}
                className="rounded-xl bg-red-600 p-4 text-lg"
              >
                Xoá ảnh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadPreview;
