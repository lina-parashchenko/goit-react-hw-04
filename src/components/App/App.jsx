import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../unsplashAPI";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setIsLoading(true);
      const results = await fetchImages(query);
      setImages(results);
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {isLoading && <Loader />}

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
