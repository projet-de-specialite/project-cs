import { Text, Avatar, HStack, VStack } from "@chakra-ui/react";
import User from "../../models/User";
interface UserItemProps {
  user: User;
  currentUser: User;
}
export default function Conversation({ user, currentUser }: UserItemProps) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <VStack width="30vw" spacing={4} p={4} borderWidth={1} borderRadius="lg">
      <HStack key={user?.id} width="100%" spacing={4}>
        <Avatar
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "noAvatar.png"
          }
        />
        <VStack alignItems="start">
          <Text>{user?.name}</Text>
          <Text color="gray.500">{user?.username}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
