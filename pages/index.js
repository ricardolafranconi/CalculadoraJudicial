import React, { useState } from 'react';
import { useMemo } from 'react';
import { jsPDF } from "jspdf";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import s from '../styles/Home.module.css';
import { Button, Flex, Box, Heading, Text, Link as ChakraLink, useColorModeValue, Input, FormControl, FormLabel, FormErrorMessage, Image } from '@chakra-ui/react';
import useTypewriter from 'react-typewriter-hook';
import  Navbar  from '../components/Navbar';
import Calculator from '../components/Calculator';

function Home() {
  const [inputValues, setInputValues] = useState({ /* initial input values */ });
  const [results, setResults] = useState(null);

  const handleInputChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const calculate = () => {
    // Translate your Excel calculations to JavaScript and set the results
    setResults(/* calculation results */);
    scroller.scrollTo('results', { duration: 1500, smooth: 'true' });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Honorarios calculados: $12,500', 10, 10);
    doc.text('Porcentaje aplicado: 20%', 10, 20);
    doc.text('Fecha de cálculo: 5 de abril de 2023', 10, 30);
    doc.text('Expediente N°: 12345/2023', 10, 40);
    doc.text('Juez: Juan Pérez', 10, 50);
    doc.text('Abogado: María Rodríguez', 10, 60);
    doc.save('results.pdf');
  };

  const backgroundImage = '/background.jpg';

  const TypingEffect = ({ text }) => {
    const typewriterText = useTypewriter(text);
    return <>{typewriterText}</>;
  };

  return (
    <div>
    <Navbar />
  
    
      <Element name="landing" className={s.landingPage}>
   
    
        {/* Add your landing page content with a modern legal background */}
        <Flex height="100%" width='100%' backgroundColor='white' alignItems='center' justifyContent='space-between'>
          <Box marginLeft='25%'>
          <Heading as="h1" size="4xl" mb={6} fontWeight='bold'>
            Calculadora Lafranconi 
            
          </Heading>
          <Box display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="2xl" mb={6}>
          Calculá los honorarios judiciales de la Provincia de Córdoba
        </Text>
        <Text fontSize="xl" mb={6} minHeight="1.2em">
          <TypingEffect text="Simple, rápida y eficiente" />
        </Text>
        <Link to="calculator" smooth={true} duration={1500}>
          <Button colorScheme="teal" variant="solid" size="lg">Hace click para empezar</Button>
        </Link>
      </Box>
          </Box>
          <Box>
            <Image src={backgroundImage} alt="background" height='750px' width='400px' objectFit="cover"
          objectPosition="center"
          borderRadius="lg" // rounded corners
          border="4px solid" // border thickness and style
          borderColor="teal.500" // border color
          boxShadow="2xl" // shadow around the image
          />
            </Box>
        </Flex>
        <Box>

        </Box>
        <Box>
        <div className={s.landingBack}>
          </div>       
        </Box>
        
      </Element>

      
   

     

      <Element name="calculator" className={s.calculatorPage}>
        <Calculator />
        
      
      </Element>
    

      <Element name="results" className={s.resultsPage}>
        {/* Display the results */}
        <Box>
          <Heading as="h3" size="xl" mb={6}>
            Results
          </Heading>
          <Text fontSize="xl" mb={6}>
      {/* Display the mock-up results here */}
      <strong>Honorarios calculados:</strong> $12,500
      <br />
      <strong>Porcentaje aplicado:</strong> 20%
      <br />
      <strong>Fecha de cálculo:</strong> 5 de abril de 2023
      <br />
      <strong>Expediente N°:</strong> 12345/2023
      <br />
      <strong>Juez:</strong> Juan Pérez
      <br />
      <strong>Abogado:</strong> María Rodríguez
    </Text>
          <Button colorScheme="teal" variant="solid" size="lg" onClick={exportToPDF}>Exportar a PDF</Button>
        </Box>
      </Element>
      </div>
    
  );
}

export default Home;













// import Head from 'next/head';
// import styles from '../styles/Home.module.css';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing <code>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
//         </a>
//       </footer>

//       <style jsx>{`
//         main {
//           padding: 5rem 0;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }
//         footer {
//           width: 100%;
//           height: 100px;
//           border-top: 1px solid #eaeaea;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         footer img {
//           margin-left: 0.5rem;
//         }
//         footer a {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           text-decoration: none;
//           color: inherit;
//         }
//         code {
//           background: #fafafa;
//           border-radius: 5px;
//           padding: 0.75rem;
//           font-size: 1.1rem;
//           font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
//             DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
//         }
//       `}</style>

//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   )
// }
