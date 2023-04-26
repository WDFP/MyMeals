import "@/styles/globals.css";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [extraRecipeData, setExtraRecipeData] = useState({
    summary: "A great meal!",
    time: 13,
    rating: 5,
  });

  return (
    <SessionProvider session={pageProps.session}>
      <Component
        {...pageProps}
        extraRecipeData={extraRecipeData}
        setExtraRecipeData={setExtraRecipeData}
      />
    </SessionProvider>
  );
}
