import "@/styles/globals.css";
import React, { useState } from "react";

export default function App({ Component, pageProps }) {
  const [extraRecipeData, setExtraRecipeData] = useState({
    summary: "A great meal!",
    time: 13,
    rating: 5,
  });

  return (
    <Component
      {...pageProps}
      extraRecipeData={extraRecipeData}
      setExtraRecipeData={setExtraRecipeData}
    />
  );
}
