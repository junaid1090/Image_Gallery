import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../style/GalleryItem.css";

function GalleryItem({
  image,
  index,
  toggleImageSelection,
  provided,
  isFirstImage,
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectChange = (e) => {
    e.preventDefault();
    toggleImageSelection(image.id);
    setIsSelected(!isSelected);
  };

  return (
    <Draggable draggableId={image.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`gallery-item ${image.isFeatured ? "featured" : ""} ${
            isSelected ? "selected" : ""
          } ${isFirstImage ? "first-image" : ""}`}
        >
          <div onClick={handleSelectChange} className="image-container">
            {index === 0 ? (
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="first-image image-hover "
              />
            ) : (
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                className="image-hover"
              />
            )}
            {isSelected && (
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleSelectChange}
                  id={`checkbox-${image.id}`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default GalleryItem;
