import { useEffect } from "react";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import "styles/reset.css";
import themeConfig from "configs/theme";

function MyApp({ Component, pageProps }) {
  const theme = createTheme(themeConfig);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>FE-Survey</title>
        <meta
          name="description"
          content="2021 survey of  front-end engineers in Taiwan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
