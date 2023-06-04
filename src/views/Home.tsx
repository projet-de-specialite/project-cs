import {
    SimpleGrid
} from "@chakra-ui/react";
import Post from "../components/Post";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Base from "./Base";
import PostService from "../services/post";

export default function Home(props: any) {

    const navigate = useNavigate();
    const user = props.user
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
        fetchPosts();
    },[])

    const fetchPosts = async () => {
        setPosts(await PostService.getFeedPosts([1]));
    }

    return (
        <>
            <Base user={user}>
                {user != "" &&
                    <SimpleGrid columns={1} spacing={10}>
                        {posts && posts.map(post =>
                            <Post post={post} user_id={user.id}/>
                        )}
                    </SimpleGrid>
                }
            </Base>

        </>
    );
}
