import { Text, Avatar, HStack, VStack } from "@chakra-ui/react";
import User from "../../models/User";
interface ConversationProps {
  conversation: {
    users: string[];
  };
  currentUser: User;
}

export default function Conversation({
  conversation,
  currentUser,
}: ConversationProps) {
  const imgUrl =
    "https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=320&crop=1385%3A1039%2Csmart&auto=webp 320w,https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=640&crop=1385%3A1039%2Csmart&auto=webp 640w,https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=990&crop=1385%3A1039%2Csmart&auto=webp 990w";

  function users() {
    return {
      id: "user2",
      name: "ziad",
      email: "ziad.elmediouni23@gmail.com",
      username: "Ziadex",
    };
  }

  const user = users();
  console.log(user);

  return (
    <VStack width="30vw" spacing={4} p={4} borderWidth={1} borderRadius="lg">
      <HStack key={user.id} width="100%" spacing={4}>
        <Avatar src={imgUrl} />
        <VStack alignItems="start">
          <Text>{user.name}</Text>
          <Text color="gray.500">{user.username}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
