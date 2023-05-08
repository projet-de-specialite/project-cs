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

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
          name: '',
          date:'',
          username: '',
          email: '',
          password:'',
          biography:'',
          
        },         

        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2))
          AuthService.register(
            values.name,
            values.date,
            values.username,
            values.email,
            values.password,
            values.biography,
            
          ).then(
            response => {
             /*  this.setState({
                message: response.data.message,
                successful: true
              }); */
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
      
             /*  this.setState({
                successful: false,
                message: resMessage
              }); */
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
                        Sign up on PicShare
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
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
                        <HStack>
                            <Box>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" id='name'
                                            name='name'
                                            onChange={formik.handleChange}
                                            value={formik.values.name}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="birthdayDate" isRequired>
                            <FormLabel>Date of birth</FormLabel>
                            <Input
                                type="date" id='date'
                                name='date'
                                onChange={formik.handleChange}
                                value={formik.values.date}/>
                        </FormControl>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" id='username'
                                name='username'
                                onChange={formik.handleChange}
                                value={formik.values.username}/>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" id='email'
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
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
                        <FormControl id="bio">
                            <FormLabel>Biography</FormLabel>
                            <Textarea placeholder='Tell a little about your life ...' id='biography'
                                name='biography'
                                onChange={formik.handleChange}
                                value={formik.values.biography}/>
                        </FormControl>
                        <Stack spacing={6} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"#13005A"}
                                color={"white"}
                                type="submit"
                                _hover={{
                                    bg: "#2D07BC",
                                }}

                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={4}>
                            <Text align={"center"}>
                                Already an user? <Link href={"/login"} color={"blue.400"}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                    </form>
                    
                </Box>
            </Stack>
        </Flex>
    );
}
