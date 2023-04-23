import {
    Box,
    Button, Center,
    Flex,
    FormControl,
    FormLabel, GridItem,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (

    <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign in on PicShare
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email"/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? "text" : "password"}/>
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }
                                    >
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"#13005A"}
                                color={"white"}
                                _hover={{
                                    bg: "#2D07BC",
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack py={2} textAlign={"center"}>
                            <Link color={"blue.400"} href={"/forgot-password"}>Forgot password ?</Link>
                        </Stack>
                        <Stack pt={4}>
                            <Text align={"center"}>
                                New on PicShare? <Link href={"/signup"} color={"blue.400"}>Create an account</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
