import {
    Card,
    Heading,
    Text, Avatar, CardHeader, Flex, Box, CardFooter, Button, Image, SimpleGrid, Center, CardBody
} from "@chakra-ui/react";
import {
    BiBell,
    BiHome,
    BiPaperPlane, BiPlusCircle, BiSearch,
    BiUserCircle,
    BsChat,
    BsHeart,
} from "react-icons/all";


export default function Home() {

    return (
        <>
            <SimpleGrid columns={1} spacing={10}>
                <Center>
                    <Card maxW='md'>
                        <CardHeader>
                            <Flex>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='ChatRoon' src='https://i.pravatar.cc/150?img=49' />
                                    <Box>
                                        <Heading size='sm'>ChatRoon</Heading>
                                        <Text fontSize='xs'>20 mars 2023</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <Image
                            objectFit='cover'
                            src='https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA'
                            alt='ChatRoon'
                        />
                        <CardBody>
                            <Text fontSize='xs'>
                                Beautiful sky
                            </Text>
                        </CardBody>
                        <CardFooter
                            justify='flex-start'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BsHeart />}>20</Button>
                            <Button flex='1' variant='ghost' leftIcon={<BsChat />}>4</Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiPaperPlane />}></Button>
                        </CardFooter>
                    </Card>
                </Center>
                <Center>
                    <Card maxW='md'>
                        <CardHeader>
                            <Flex>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Gaeitan SceauSix' src='https://i.pravatar.cc/150?img=68' />

                                    <Box>
                                        <Heading size='sm'>Gaeitan SceauSix</Heading>
                                        <Text fontSize='xs'>20 mars 2023</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <Image
                            objectFit='cover'
                            src='https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s'
                            alt='Gaeitan SceauSix'
                        />
                        <CardBody>
                            <Text fontSize='xs'>
                                Beautiful sky
                            </Text>
                        </CardBody>
                        <CardFooter
                            justify='flex-start'
                            flexWrap='wrap'
                            sx={{
                                '& > button': {
                                    minW: '136px',
                                },
                            }}
                        >
                            <Button flex='1' variant='ghost' leftIcon={<BsHeart />}>20</Button>
                            <Button flex='1' variant='ghost' leftIcon={<BsChat />}>4</Button>
                            <Button flex='1' variant='ghost' leftIcon={<BiPaperPlane />}></Button>
                        </CardFooter>
                    </Card>
                </Center>
            </SimpleGrid>
        </>
    );
}
