import {
    Text, Avatar, CardHeader, Flex, Heading, Box, CardFooter, Button, Image, Card, CardBody
 } from "@chakra-ui/react";
 
import {
    BiPaperPlane,
    BsChat,
    BsHeart,
} from "react-icons/all";

import axios from "axios";

import React, { useEffect, useState } from "react";
import Post from "../components/Post";


type ProfileData = {
    name: string;
    birthDate: string;
    bio: string;
    website: string;
    avatar: string;
    created_on: string;
  };

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>();
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get<ProfileData>(process.env.REACT_APP_PROFILE_URL + "profiles/1");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
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
          <Post/>
        </>
      ) : (
        <Text>Chargement des données du profil ...</Text>
      )}

    </Flex>
  );
};

export default Profile;
