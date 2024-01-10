import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, Textarea, useColorModeValue, Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react';
import Navbar from '../components/NavBar';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const phoneNumber = '3755306410'; // Replace with your phone number

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi, my name is ${name}. ${message}`)}`;

    const formBackground = useColorModeValue("white.300", "gray.700");

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg={formBackground}
            color="black"
        >
            <Navbar />
            <Box 
                p={20}
                w={{base: "90%", md: "60%", lg: "60%"}}
                bg={formBackground}
                borderRadius="lg"
                boxShadow="lg"
            >
                <Fade in={true} offsetY="20px" transitionDuration="6.0" delay={1} >
                    <Heading mb={6} fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>Contacto</Heading>
                </Fade>

                <ScaleFade initialScale={0.9} in={true} transitionDuration="6.0" delay={1}>
                    <Text mb={5} fontSize={{ base: "md", md: "lg", lg: "xl" }}>Necesitas mas asesoramiento?</Text>
                    <Text mb={5} fontSize={{ base: "md", md: "lg", lg: "xl" }}>Envianos un mensaje por whatsapp</Text>
                    <Button colorScheme="whatsapp" mt={3} onClick={() => window.open(whatsappUrl, "_blank")}>
                        Envianos un mensaje por Whatsapp
                    </Button>
                </ScaleFade>

                <SlideFade in={true} offsetY="20px" transitionDuration="6.0" delay={1}>
                    <Text mt={5} mb={5} fontSize={{ base: "md", md: "lg", lg: "xl" }}>O escribinos tu consulta y te responderemos a la brevedad</Text>

                    <FormControl id="name" isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl id="message" isRequired>
                        <FormLabel>Consulta</FormLabel>
                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </FormControl>

                    <Button colorScheme="blue" mt={3}>
                        Enviar Consulta
                    </Button>
                </SlideFade>
            </Box>
        </Flex>
    );
}