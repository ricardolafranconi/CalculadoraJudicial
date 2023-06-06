import React, { useState } from "react";
import { Icon, Box, Text, Heading, Flex, Button, FormControl, FormLabel, Input, Textarea, Link } from "@chakra-ui/react";
import {BiLogoWhatsapp} from 'react-icons'


export default function Contact() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const phoneNumber = '3755306410'; // Replace with your phone number

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi, my name is ${name}. ${message}`)}`;

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg="white.800"
            color="black"
        >
            <Box 
                p={5}
                w={{base: "90%", md: "60%", lg: "40%"}}
                bg="white.700"
                borderRadius="md"
                align='center'
            >
                <Heading mb={5}>Contacto</Heading>
                
                <Text mb={5}>Necesitas mas asesoramiento?</Text>
                <Text mb={5}>Envianos un mensaje por whatsapp</Text>
                
                <Link href={whatsappUrl} isExternal>
                    <Button colorScheme="whatsapp" mt={3} rightIcon={<Icon as={BiLogoWhatsapp}/>} >
                        Envianos un mensaje
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
}

