import axios from "axios";

const ACCESS_KEY = "ZPyPZTZXbsO4aUsXink8LMvJG_aCbTKm8FNJSwccMcI";

export async function fetchImages(query, page = 1) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return {
    images: data.results,
    total: data.total,
  };
}
