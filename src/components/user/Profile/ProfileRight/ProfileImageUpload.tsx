import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  setAvatar: (file: File) => void; // Truyền file thay vì chuỗi base64
}

const FileUpload: React.FC<FileUploadProps> = ({ setAvatar }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  console.log(fileName);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log("File name:", file.name);
      setFileName(file.name);

      // Cập nhật hình ảnh đã chọn để hiển thị preview
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Truyền file lên Form hoặc component cha
      setAvatar(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          <p>Chưa có hình ảnh nào</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
