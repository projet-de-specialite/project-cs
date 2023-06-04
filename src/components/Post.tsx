import {
    Card,
    Heading,
    Text,
    Avatar,
    CardHeader,
    Flex,
    Box,
    CardFooter,
    Button,
    Image,
    Center,
    CardBody,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input
} from "@chakra-ui/react";
import {
    BiPaperPlane,
    BsChat,
    BsHeart,
} from "react-icons/all";
import {useState} from "react";
import CommentService from "../services/comment";

export default function Post(props:any) {

    const [openModale, setOpenModale] = useState(false);
    const [comment, setComment] = useState("");

    const toggleModale = async () => {
        setOpenModale(!openModale);
    }

    const submitAddComment = async () => {
        await CommentService.create(props.user_id, comment, props.post.id);
        setOpenModale(false);
    }

    const changeValue = async (e:any) =>{
        setComment(e.target.value);
    }

    return (
        <>
            <Center>
                <Card maxW='md'>
                    <CardHeader>
                        <Flex>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name='ChatRoon' src='https://i.pravatar.cc/150?img=49' />
                                <Box>
                                    <Heading size='sm'>{props.post.user}</Heading>
                                    <Text fontSize='xs'>{props.post.date}</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <Image
                        objectFit='cover'
                        src={props.post.image}
                    />
                    <CardBody>
                        <Text fontSize='xs'>
                            {props.post.text}
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
                        <Button flex='1' variant='ghost' leftIcon={<BsHeart />}>{props.post.like}</Button>
                        <Button onClick={() => toggleModale()} flex='1' variant='ghost' leftIcon={<BsChat />}>{props.post.comments}</Button>
                        <Button flex='1' variant='ghost' leftIcon={<BiPaperPlane />}></Button>
                    </CardFooter>
                </Card>
            </Center>
            { openModale &&
                <Modal isOpen={openModale} onClose={toggleModale}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Ajouter un commentaire</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder='Un commentaire' onChange={() => changeValue}/>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => toggleModale()}>
                                Fermer
                            </Button>
                            <Button variant='ghost' onClick={() => submitAddComment()}>Ajouter</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    );
}
