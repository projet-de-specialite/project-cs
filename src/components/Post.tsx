import {
    Card,
    Heading,
    Text, Avatar, CardHeader, Flex, Box, CardFooter, Button, Image, Center, CardBody
} from "@chakra-ui/react";
import {
    BiPaperPlane,
    BsChat,
    BsHeart,
} from "react-icons/all";


export default function Post(props:any) {

    return (
        <>
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

        </>
    );
}
