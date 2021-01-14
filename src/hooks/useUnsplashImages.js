import { useEffect, useState } from "react";

export default function useUnsplashImages(orientation = "squarish") {
  const [images, setImages] = useState([]);
  const imageMockUrl = `https://api.unsplash.com/search/photos?query=still%20product&orientation=${orientation}&page=1&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  function randomImage(size = "small") {
    console.log("random", images);
    return images[Math.floor(Math.random() * images.length)]?.sizes[size] || "";
  }

  useEffect(() => {
    async function fetchMockImages() {
      const storageImages = localStorage.getItem("mockImages");

      if (storageImages) {
        const imgs = JSON.parse(storageImages);
        if (imgs && imgs.length) setImages(imgs);
        return;
      }

      try {
        console.log("Fetching from API");
        const response = await fetch(imageMockUrl);
        const json = await response.json();
        const list = json.results.map((image) => ({
          sizes: image.urls,
          name: image.alt_description,
          color: image.color,
        }));
        setImages(list);
      } catch (e) {
        console.log(e, "");
      }
    }

    fetchMockImages();
    console.log("useUnsplashImages", randomImage());
    //eslint-disable-next-line
  }, [imageMockUrl]);

  useEffect(() => {
    if (!images) return;
    const imgs = JSON.stringify(images);
    if (imgs.length > 2) localStorage.setItem("mockImages", imgs);
    console.log("Images updated", images);
  }, [images]);

  return {
    images,
    randomImage,
  };
}
