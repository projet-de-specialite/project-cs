import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text, Textarea,
    useColorModeValue,
} from "@chakra-ui/react";
import {useState} from "react";
import { useFormik } from "formik";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import { values } from "lodash";
import AuthService from "../services/auth";
import {Alert, AlertIcon, AlertTitle, AlertDescription} from '@chakra-ui/react'


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password:'',
          
        },         

        onSubmit: (values) => {
          AuthService.register(
            values.username,
            values.email,
            values.password
            
          ).then(
            response => {
                setIsError(false);
                setIsSuccess(true);
                setMessage("Votre compte à été créé, connectez vous.");
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                    setIsError(true);
                    setIsSuccess(false);
                    setMessage(error.response.data.message);

            }
          );   
        },
      })

      
    return (




    <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        S'inscrire sur PicShare
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        pour partager votre vie fabuleuse ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4}>
                        {(isError) ? (<Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>{ message }</AlertDescription>
                            </Alert>) : ''}

                        {(isSuccess) ? (<Alert status='success'>
                            <AlertIcon />
                            <AlertDescription>{ message }</AlertDescription>
                            </Alert>) : ''}
                   
                   
                        <FormControl id="username" isRequired>
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <Input type="text" id='username'
                                name='username'
                                onChange={formik.handleChange}
                                value={formik.values.username}/>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" id='email'
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? "text" : "password"} id='password'
                                name='password'
                                onChange={formik.handleChange}/>
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
                        <Stack spacing={6} pt={2}>
                            <Button
                                loadingText="Soumission"
                                size="lg"
                                bg={"#13005A"}
                                color={"white"}
                                type="submit"
                                _hover={{
                                    bg: "#2D07BC",
                                }}

                            >
                                S'inscrire
                            </Button>
                        </Stack>
                        <Stack pt={4}>
                            <Text align={"center"}>
                                Vous avez déjà un compte ? <Link href={"/login"} color={"blue.400"}>Se connecter</Link>
                            </Text>
                        </Stack>
                    </Stack>
                    </form>
                    
                </Box>
            </Stack>
        </Flex>
    );
}