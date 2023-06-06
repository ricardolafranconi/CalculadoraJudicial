import React from "react";
import { Box, Text, Heading, Flex, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export default function Contact() {
    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg="gray.800"
            color="white"
        >
            <Box 
                p={5}
                w={{base: "90%", md: "60%", lg: "40%"}}
                bg="gray.700"
                borderRadius="md"
            >
                <Heading mb={5}>Contact</Heading>
                <Text mb={5}>Send us a message!</Text>
                <form>
                    <FormControl id="email" isRequired mb={5}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="message" isRequired mb={5}>
                        <FormLabel>Your message</FormLabel>
                        <Textarea />
                    </FormControl>
                    <Button colorScheme="teal" type="submit">Submit</Button>
                </form>
            </Box>
        </Flex>
    );
}
