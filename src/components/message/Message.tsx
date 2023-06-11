import { Box, Text, Image, HStack, Flex } from "@chakra-ui/react";
import TimestampFormatter from "../../utils/date";
import "./message.css";

interface IMessage {
  message: {
    text: string;
    createdAt: { _seconds: number; _nanoseconds: number };
  };
  own: boolean;
}

export default function Message({ message, own }: IMessage) {
  const imgUrl =
    "https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=320&crop=1385%3A1039%2Csmart&auto=webp 320w,https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=640&crop=1385%3A1039%2Csmart&auto=webp 640w,https://static.independent.co.uk/2022/08/22/10/mark%20zuckerberg%20metaverse%20avatar.png?quality=75&width=990&crop=1385%3A1039%2Csmart&auto=webp 990w";
  return (
    <Flex direction="column" align={own ? "flex-end" : "flex-start"} mt={5}>
      <Flex align="center">
        <Image boxSize="32px" borderRadius="full" src={imgUrl} alt="" mr={2} />
        <Box
          p={2}
          borderRadius="md"
          backgroundColor={own ? "gray.200" : "blue.500"}
          color={own ? "black" : "white"}
          maxWidth="300px"
        >
          <Text fontSize="md">{message.text}</Text>
        </Box>
      </Flex>
      <Box mt={2} fontSize="sm" color="gray.500">
        <TimestampFormatter timestamp={message.createdAt} />
      </Box>
    </Flex>
  );
}
