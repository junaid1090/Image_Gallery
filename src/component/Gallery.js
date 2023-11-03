import React, { useState } from "react";
import GalleryItem from "./GalleryItem";
import ImageUpload from "./ImageUpload";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../style/Gallery.css";

const initialImages = [
  { id: "1", src: "/images/PPvtmDug.jpeg", isFeatured: true },
  { id: "2", src: "/images/DXtsUQXA.jpeg", isFeatured: false },
  { id: "3", src: "/images/sNjgOUcw.jpeg", isFeatured: false },
  { id: "4", src: "/images/atVi-HZw.jpeg", isFeatured: false },
  { id: "5", src: "/images/e6YXSDsw.jpeg", isFeatured: false },
  { id: "6", src: "/images/P3RkzxfA.jpeg", isFeatured: false },
  { id: "7", src: "/images/sPdK7KpQ.jpeg", isFeatured: false },
  { id: "8", src: "/images/iN5R6-XA.jpeg", isFeatured: false },
  { id: "9", src: "/images/oCjGvelQ.jpeg", isFeatured: false },
  { id: "9", src: "/images/Ur7monQg.jpeg", isFeatured: false },
];

function Gallery() {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleSetFeatureSelected = () => {
    const updatedImages = images.map((image) => ({
      ...image,
      isFeatured: selectedImages.includes(image.id),
    }));
    setImages(updatedImages);
  };

  const handleImageUpload = (newImage) => {
    const newImages = [
      ...images,
      {
        id: `image-${Date.now()}`,
        src: URL.createObjectURL(newImage),
        isFeatured: false,
      },
    ];
    setImages(newImages);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-actions">
        <ImageUpload onImageUpload={handleImageUpload} />
        <button
          onClick={handleDeleteSelected}
          id="delete"
          className={selectedImages.length > 0 ? "delete-active" : ""}
        >
          Delete
        </button>
      </div>
      <div className="selected-count">
        {selectedImages.length} File Selected:{" "}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="gallery"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <GalleryItem
                      image={image}
                      index={index}
                      toggleImageSelection={toggleImageSelection}
                      provided={provided}
                      isFirstImage={image.id === "1"}
                    />
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Gallery;
