import {
    Text, Avatar, Flex, Heading, Box, SimpleGrid,
} from "@chakra-ui/react";
 
import axios from "axios";

import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import {useNavigate} from "react-router-dom";
import Base from "./Base";
import PostService from "../services/post";

type ProfileData = {
    name: string;
    birthDate: string;
    bio: string;
    website: string;
    avatar: string;
    created_on: string;
  };

const Profile = (props: any) => {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const user = props.user;

    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
    },[])

    useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await axios.get<ProfileData>(process.env.REACT_APP_PROFILE_URL + "profiles/1")
            .then((response) => {
                setProfileData(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
    fetchUserPost();
  }, []);

    const fetchUserPost = async () => {
      setPosts(await PostService.getUserPosts(1));
    };

  return (
      <Base user={user}>
        <Flex flexDirection="column" alignItems="center">
          {profileData ? (
            <>
              <Avatar size="xl" src={profileData.avatar} mb="4" />
              <Box>
                <Heading as="h2" size="lg">
                  {profileData.name}
                </Heading>
                <Text>{profileData.birthDate}</Text>
              </Box>
              <Box mt="4">
                <Text fontSize="lg">{profileData.bio}</Text>
                <Text fontSize="md" color="blue.500" mt="2">
                  {profileData.website}
                </Text>
                <Text fontSize="sm" mt="2">
                  Joined: {profileData.created_on}
                </Text>
              </Box>
              <Heading size='sm'>Posts</Heading>
                <SimpleGrid columns={1} spacing={10}>
                    {posts && posts.map(post =>
                        <Post post={post} user_id={user.id} />
                    )}
                </SimpleGrid>
            </>
          ) : (
            <Text>Chargement des données du profil ...</Text>
          )}

        </Flex>
      </Base>

  );
};

export default Profile;
