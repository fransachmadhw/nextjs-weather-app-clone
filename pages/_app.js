import { ThemeProvider } from 'next-themes'
import '../styles/main.scss';
import React from 'react';
import Router from 'next/router';
import nprogress from 'nprogress';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    function start() {
      nprogress.start();
    }
    function end() {
      nprogress.done();
    }

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
