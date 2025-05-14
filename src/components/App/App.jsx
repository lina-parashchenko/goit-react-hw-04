import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../unsplashAPI";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  const handleSearch = async (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term");

      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);

    try {
      setIsLoading(true);
      const { images: results, total } = await fetchImages(newQuery, 1);
      setImages(results);
      setTotalImages(total);
    } catch (err) {
      setError("Failed to fetch images.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const { images: newImages } = await fetchImages(query, nextPage);
      newImages((prevImages) => [...prevImages, ...results]);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more images.");
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

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />

          {images.length < totalImages && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {isLoading && <Loader />}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
