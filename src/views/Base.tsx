import {
    Card,
    Grid,
    GridItem,
    Heading,
    Menu,
    MenuItem,
    Text, Avatar, CardHeader, Flex, Box, Center
} from "@chakra-ui/react";
import {
    BiHome,
    BiPlusCircle,
    BiUserCircle, BsBoxArrowLeft, BsFillPeopleFill,

} from "react-icons/all";
import AuthService from "../services/auth";

import {useNavigate} from "react-router-dom";
import React from "react";


const Base = (props: any) => {

    const navigate = useNavigate();
    const user = props.user
    console.log(user)

    const logout = () => {
        AuthService.logout();
        navigate("/login");
    }

    return (
        <>
            <Grid
                templateAreas={`"header header header"
                  "side_left main side_right"
                  "footer footer footer"`}
                gridTemplateRows={'50px 1fr 50px'}
                gridTemplateColumns={'200px 1fr 250px'}
                h='200px'
                color='blackAlpha.700'
            >
                <GridItem pl='2' bg='#13005A' area={'header'}>
                    <Center>
                        <Heading color='white'>PicShare</Heading>
                    </Center>
                </GridItem>
                <GridItem pl='2' py='2' area={'side_left'} borderRight="1px" borderColor="gray.300" >
                    <Menu>
                        <MenuItem icon={<BiHome size='20px'/>} _hover={{ color: "gray.900" }} as="a" href="/" _activeLink={{color: "black"}}>
                            Accueil
                        </MenuItem>
                        <MenuItem icon={<BiPlusCircle size='20px'/>} _hover={{ color: "gray.900" }} as="a" href="/createPost">
                            Créer un post
                        </MenuItem>
                        <MenuItem icon={<BiUserCircle size='20px'/>} _hover={{ color: "gray.900" }} as="a" href="/profile">
                            Profil
                        </MenuItem>
                        <MenuItem icon={<BsFillPeopleFill size='20px'/>} _hover={{ color: "gray.900" }} as="a" href="/subscription">
                            Abonnements
                        </MenuItem>
                        { user != null &&
                            <MenuItem icon={<BsBoxArrowLeft size='20px'/>} onClick={() => logout()} _hover={{ color: "gray.900" }} as="a" href={""}>
                                Déconnexion
                            </MenuItem>
                        }

                    </Menu>
                </GridItem>

                <GridItem pl='2' py='5' area={'main'}>
                    {props.children}
                </GridItem>

                <GridItem pr='2' pl='2' area={'side_right'}  borderLeft="1px" borderColor="gray.300">
                    <Card py='2' maxW='sm' variant={"unstyled"}>
                        <CardHeader>
                            <Flex>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Segun Adebayo' src='https://i.pravatar.cc/300' />
                                    <Box>
                                        <Text _hover={{ color: "gray.900" }}>John Doe</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                    </Card>

                </GridItem>
                <GridItem pl='2' bg='#13005A' area={'footer'}>
                </GridItem>
            </Grid>
        </>
    );
}

export default Base;
