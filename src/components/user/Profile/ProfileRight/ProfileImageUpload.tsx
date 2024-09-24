import AvatarComponent from "@/components/Avatar";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Log tên file
      console.log("File name:", file.name);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Cập nhật hình ảnh đã chọn
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng URL
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (fileName && selectedImage) {
      // Thực hiện upload lên server
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([selectedImage], { type: "image/png" }),
        fileName,
      );

      try {
        const response = await fetch("YOUR_UPLOAD_URL_HERE", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Upload successful!");
        } else {
          console.error("Upload failed.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Kéo và thả file vào đây, hoặc nhấp để chọn file</p>
        {selectedImage ? (
          <div style={{ marginTop: "20px" }}>
            <h4>Hình ảnh đã chọn:</h4>
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "999px",
              }}
            />
          </div>
        ) : (
          <AvatarComponent
            height="150"
            width="200"
            urlImage="https://images.unsplash.com/photo-1662724520253-e7157e9d6616?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
      </div>
      {selectedImage && (
        <button onClick={handleUpload} style={{ marginTop: "10px", color:"#000" }}>
          Cập nhật
        </button>
      )}
    </div>
  );
};

export default FileUpload;
