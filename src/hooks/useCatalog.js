import { useEffect, useState } from "react";

const images = [
  "https://comprarquartzolit.saint-gobain.com.br/sites/default/files/styles/product_image/public/product-image/AF-3D-WEBER-CIMENTCOLA-INTERNO-20KG-PLASTICO-SIMP.jpg",
  "https://comprarquartzolit.saint-gobain.com.br/sites/default/files/styles/product_image/public/product-image/Super_Cozinhas_e_Banheiros.jpg",
  "https://comprarquartzolit.saint-gobain.com.br/sites/default/files/styles/product_image/public/product-image/AF-3D-REJUNTE-PORCELANAS-CERAMICAS-PLASTICO-1KG-SIMP.png",
];

const randomImage = () => images[Math.floor(Math.random() * images.length)];

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
      const response = await fetch(
        "https://5ff711bde7164b0017e1a1ac.mockapi.io/api/catalog"
      );
      const result = await response.json();

      setCatalog(
        result.map((p) => ({
          ...p,
          quantity: 1,
          image: randomImage(),
          price: parseFloat(p.price),
        }))
      );
    }

    fetchProducts();
  }, []);

  const orderBy = (field) => {
    setCatalog(
      [...catalog].sort((a, b) => {
        if (field == "name") return a[field].localeCompare(b[field]);

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
