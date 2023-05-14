import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Box, Flex, Input, Button, VStack } from "@chakra-ui/react";
import IUser from "../../models/User";
import IConversation from "../../models/Conversation";
import IMessage from "../../models/Message";

export default function Messenger() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const socket = useRef<any>();
  const scrollRef = useRef<any>();

  function createRandomUser(): IUser {
    return {
      id: "user1",
      name: "sohaib",
      email: "sohaib.elmediouni23@gmail.com",
      username: "sohaibex",
    };
  }

  const user = createRandomUser();
  console.log(user);

  const url = "http://127.0.0.1:3000/api";

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data: { senderId: any; text: any }) => {
      console.log("Socket io", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.users.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users: IUser) => {});
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(url + "/conversations/" + user.id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(url + "/messages/" + currentChat?.id);
        setMessages(res.data);
        console.log("getMessages", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("current Chat", currentChat);
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat?.id,
    };

    const receiverId = currentChat?.users.find((userId) => userId !== user.id);

    socket.current?.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(url + "/messages", message);
      setMessages([...messages, res.data]);
      console.log("Messages", res.data);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Flex width="100vw" height="100vh">
        <VStack
          width="30vw"
          spacing={4}
          p={4}
          borderWidth={1}
          borderRadius="lg"
        >
          {conversations.map((c, i) => (
            <div key={i} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </VStack>
        {currentChat ? (
          <>
            <VStack
              width="70vw"
              spacing={4}
              p={4}
              borderWidth={1}
              borderRadius="lg"
            >
              <Box
                width="100%"
                height="80vh"
                overflowY="auto"
                p={4}
                borderWidth={1}
                borderRadius="lg"
              >
                {messages.map((m, i) => (
                  <div ref={scrollRef} key={i}>
                    <Message message={m} own={m.sender === user.id} />
                  </div>
                ))}
              </Box>
              <Flex width="100%">
                <Input
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  placeholder="Type your message"
                />
                <Button colorScheme="teal" ml={2} onClick={handleSubmit}>
                  Send
                </Button>
              </Flex>
            </VStack>
          </>
        ) : (
          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
        )}
      </Flex>
    </>
  );
}
