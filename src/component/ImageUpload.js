import React, { useState } from "react";

function ImageUpload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonFileClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    onImageUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="fileInput"
        style={{ display: "none" }}
      />

      <button onClick={handleButtonFileClick} id="add">
        Add Images
      </button>
    </div>
  );
}

export default ImageUpload;
