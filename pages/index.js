import React, { useState, useContext } from "react";
import { useMemo } from "react";
import { jsPDF } from "jspdf";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import s from "../styles/Home.module.css";
import {
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image,
  Select,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import useTypewriter from "react-typewriter-hook";
import Navbar from "../components/NavBar";
import Calculator from "../components/Calculator";
import CalculadoraSucesorio from "../components/CalculadoraSucesorio";
import { CalculatorResultsContext } from "../contextApi/CalculatorResultsContext";

function Home() {
 

  const BoxSize = ["100%", "75%", "50%", "25%"]; // size for different screen widths
  const imageHeight = ["300px", "450px", "600px", "750px"]; // Image height for different screen widths
  const imageWidth = ["100%", "300px", "350px", "400px"]; // Image width for different screen widths
  const headingSize = ["xl", "2xl", "3xl", "4xl"]; // Heading size for different screen widths


 

  const backgroundImage = "/background.jpg";

  const [selectedCalculator, setSelectedCalculator] = useState('calculator1')

  const TypingEffect = ({ text }) => {
    const typewriterText = useTypewriter(text);
    return <>{typewriterText}</>;
  };

  return (
    <div>
      <Navbar />

      <Element name="landing" className={s.landingPage}>
        {/* Add your landing page content with a modern legal background */}
        <Flex
          height="100%"
          width="100%"
          backgroundColor="white"
          alignItems="center"
          justifyContent={['center', 'center', 'space-around', 'space-between']}
        >
          <Box></Box>
            <Box align='center'>
          <Heading as="h1" size={["xl", "2xl", "3xl", "3xl", '4xl']} mb={6} fontWeight="bold">
              Calculadora Lafranconi
            </Heading>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text fontSize={["l", "xl", "2xl", "2xl"]} mb={6}>
                Calculá los honorarios judiciales de la Provincia de Córdoba
              </Text>
              <Text fontSize="xl" mb={6} minHeight="1.2em">
                <TypingEffect text="Simple, rápida y eficiente" />
              </Text>
              <Link to="calculator" smooth={true} duration={1500}>
                <Button colorScheme="teal" variant="solid" size="lg">
                  Hace click para empezar
                </Button>
              </Link>
            </Box>
          </Box>
          <Box>
          <Image
              src={backgroundImage}
              alt="background"
              height={["none", "none", "400px", "400px", '600px']}
  width="400px"
              objectFit="cover"
              objectPosition="center"
              borderRadius="lg"
              border="4px solid"
              borderColor="teal.500"
              boxShadow="2xl"
              display={["none", "none", "none", "cover"]}
            />
          </Box>
          
        </Flex>
        <Box></Box>
        <Box>
          <div className={s.landingBack}></div>
        </Box>
      </Element>

      <Flex
  alignItems="center"
  justifyContent="center"
  direction="column" // Add this line
  minHeight="100vh" // Add this line
>
  <VStack spacing={4} width="100%"> // Add spacing and width

    <Spacer /> // Add this line

<FormControl 
  width={{ base: "90%", sm: "60%", md: "40%", lg: "30%" }} 
  mt={4} 
  mb={2} 
  justifyContent='center'
  boxShadow="lg"
  borderRadius="md"
  p={4}
  backgroundColor="white"
  zIndex={1}
>
  <Flex alignItems="center" justifyContent="space-between">
    <Box p={2}>
      <FormLabel mb={0}>Tipo de Juicio</FormLabel>
    </Box>
    <Box p={2}>
      <Select
        value={selectedCalculator}
        onChange={(e) => setSelectedCalculator(e.target.value)}
      >
        <option value="calculator1">Cobro de Pesos</option>
        <option value="calculator2">Sucesorio</option>
      </Select>
    </Box>
  </Flex>
</FormControl>

<Spacer />

<HStack>

{selectedCalculator === "calculator1" && (
  <Element name="calculator" className={s.calculatorPage}>
    <Calculator />
  </Element>
)}

{selectedCalculator === "calculator2" && (
  <Element name="calculator" className={s.calculatorPage}>
    <CalculadoraSucesorio />
  </Element>
)}

</HStack>
        
</VStack>
        </Flex>
     
    </div>
  );
}

export default Home;
