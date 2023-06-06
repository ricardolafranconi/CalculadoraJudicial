// pages/_app.js

import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import { extendTheme } from '@chakra-ui/react';
import Calculator from '../components/Calculator';
import { CalculatorResultsProvider } from '../contextApi/CalculatorResultsContext';

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
        <CalculatorResultsProvider>
        <Component {...pageProps} />
       
      
      </CalculatorResultsProvider>
    </ChakraProvider>
  )
}

export default MyApp