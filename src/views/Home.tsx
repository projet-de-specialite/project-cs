import {
    SimpleGrid
} from "@chakra-ui/react";
import Post from "../components/Post";

export default function Home() {

    return (
        <>
            <SimpleGrid columns={1} spacing={10}>
                <Post/>
                <Post/>
            </SimpleGrid>
        </>
    );
}
