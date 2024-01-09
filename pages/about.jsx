import React from "react";
import { Box, Text, Image, Flex, Heading } from "@chakra-ui/react";
import { useSpring, animated, config } from 'react-spring';
import NavBar from '../components/NavBar';

const foto = './JuarezLafranconiSandoval.jpeg'
const About = () => {
  const textFade = useSpring({
    from: { opacity: 0, marginTop: -500 },
    to: { opacity: 1, marginTop: 0 },
   config: { tension: 100, friction: 40 }
  });

  const imageFade = useSpring({
    from: { opacity: 0, marginLeft: -1000 },
    to: { opacity: 1, marginLeft: 0 },
    config: { tension: 100, friction: 40 }
  });

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" h="100vh">
      <NavBar />
      <Flex direction={{base: "column", md: "row"}} w="80%" alignItems="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" margin="5">
          <animated.div style={imageFade}>
            <Image boxSize="300px" src={foto} alt="Profile picture" mb="3" />
          </animated.div>
        </Box>
        <Box maxW="sm"  borderRadius="lg" overflow="hidden" margin="5">
          <animated.div style={textFade}>
            <Heading mb={4}>Hugo Lafranconi, abogado</Heading>
            <Text>
              Hugo Lafranconi es un abogado de la ciudad de Cordoba Capital con amplia trayectoria
            </Text>
          </animated.div>
        </Box>
      </Flex>
    </Flex>
  );
};

export default About;
