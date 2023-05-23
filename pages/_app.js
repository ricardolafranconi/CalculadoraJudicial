// pages/_app.js

import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../components/store';

const Fonts = () => (
    <Head>
      
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );

  const theme = extendTheme({
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Roboto, sans-serif',
    },
  });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <Fonts />
        <Provider store={store}>
      <Component {...pageProps} />\
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp