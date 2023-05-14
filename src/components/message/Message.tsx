import { Box, Text, Image, HStack } from "@chakra-ui/react";
import TimestampFormatter from "../../utils/date";

interface IMessage {
  message: {
    text: string;
    createdAt: number;
  };
  own: boolean;
}
export default function Message({ message, own }: IMessage) {
  console.log(message.createdAt);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignSelf={own ? "flex-end" : "flex-start"}
    >
      <HStack spacing={2}>
        <Image
          boxSize="50px"
          borderRadius="full"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <Text>{message.text}</Text>
      </HStack>
      <Text fontSize="xs" color="gray.500">
        <TimestampFormatter
          timestamp={{ _seconds: message.createdAt, _nanoseconds: 0 }}
        />
      </Text>
    </Box>
  );
}
