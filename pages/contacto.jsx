import React from "react";
import {Box, Text, Heading, Flex, Button} from "@chakra-ui/react";


export default function Contact() {
    return (
        <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        >
        <Heading>Contact</Heading>
        <Text>Send us a message!</Text>
        <Button variantColor="teal" size="lg">
            Button
        </Button>
        </Flex>
    );
    }
