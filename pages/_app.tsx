import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ContextProvider from "../components/Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
	  <>
      <Head>
        <title>BOTW Crafting Compendium</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
<link rel="shortcut icon" href="/rupee.svg" />
        <meta
          name="description"
          content="All of the recipes for Legend of Zelda: Breath of the Wild in one convenient place."
        />
        <meta
          name="keywords"
          content="Zelda, Legend of Zelda, Breath of The Wild, Recipe, Crafting"
        />
        <meta name="author" content="Leon Mayer" />
      </Head>
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
	  </>
  );
}
export default MyApp;
