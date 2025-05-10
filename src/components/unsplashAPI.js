const ACCESS_KEY = "ZPyPZTZXbsO4aUsXink8LMvJG_aCbTKm8FNJSwccMcI";

export async function fetchImages(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();
  return data.results;
}
