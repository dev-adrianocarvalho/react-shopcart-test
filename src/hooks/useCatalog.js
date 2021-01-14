import { useEffect, useState } from "react";
import useUnsplashImages from "./useUnsplashImages";

export default function useCatalog() {
  const [catalog, setCatalog] = useState([]);

  //const [ordering, setOrdering] = useState("id");
  const [orderOptions] = useState([
    { field: "id", name: "Padrão" },
    { field: "price", name: "Preço" },
    { field: "name", name: "Nome" },
  ]);

  useEffect(() => {
    async function fetchProducts() {
      console.log("init useCatalog");

      const response = await fetch(
        "https://5ff711bde7164b0017e1a1ac.mockapi.io/api/catalog"
      );

      const result = await response.json();
      const productsWithImages = result.map((p) => ({
        ...p,
        quantity: 1,
        price: parseFloat(p.price),
        //image: randomImage(),
      }));

      setCatalog(productsWithImages);

      console.log("end useCatalog");
    }

    fetchProducts();
    //eslint-disable-next-line
  }, []);

  const orderBy = (field) => {
    setCatalog(
      [...catalog].sort((a, b) => {
        if (field === "name") return a[field].localeCompare(b[field]);

        return a[field] - b[field];
      })
    );
  };

  return {
    catalog,
    orderOptions,
    orderBy,
  };
}
