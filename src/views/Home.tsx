import {
    SimpleGrid
} from "@chakra-ui/react";
import Post from "../components/Post";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Home(props: any) {


    const navigate = useNavigate();
    const { user } = props.user;

    useEffect(() => {
        if(user == "null" || user == undefined){
            navigate("/login");
        }
    },[user])


    return (
        <>
            <SimpleGrid columns={1} spacing={10}>
                <Post/>
                <Post/>
            </SimpleGrid>
        </>
    );
}
