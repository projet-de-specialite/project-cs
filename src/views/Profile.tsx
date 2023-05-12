import {
    Text, Avatar, CardHeader, Flex, Heading, Box, CardFooter, Button, Image, Card, Center, CardBody
 } from "@chakra-ui/react";
 
import {
    BiPaperPlane,
    BsChat,
    BsHeart,
} from "react-icons/all";

import axios from "axios";

import React, { useEffect, useState } from "react";


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
        </>
      ) : (
        <Text>Loading profile data...</Text>
      )}
      <Heading size='sm'>Posts</Heading>

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
    </Flex>
  );
};

export default Profile;
