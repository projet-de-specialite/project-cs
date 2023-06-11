import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Box, Flex, Input, Button, VStack, Center } from "@chakra-ui/react";
import IUser from "../../models/User";
import IConversation from "../../models/Conversation";
import IMessage from "../../models/Message";
import { useNavigate } from "react-router-dom";

export default function Messenger(props: any) {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const socket = useRef<any>();
  const scrollRef = useRef<any>();
  const currentUser = props.user;
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const url = process.env.REACT_APP_MP_URL;
  const sockets_url = process.env.REACT_APP_SOCKETS_URL;

  const fetchData = useCallback(async () => {
    try {
      const [usersResponse, conversationsResponse] = await Promise.all([
        axios.get(url + "/users/all"),
        axios.get(url + "/conversations/" + currentUser.id),
      ]);
      console.log("current Usssssss", currentUser);
      console.log("usersResponse", usersResponse);
      const otherUsers = usersResponse.data.filter(
        (u: IUser) => u.id !== currentUser.id
      );
      console.log("otherUsers", otherUsers);

      setUsers(otherUsers);
      setConversations(conversationsResponse.data);
    } catch (err) {
      console.error(err);
    }
  }, [currentUser, url]);

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }
    fetchData();
  }, [navigate, currentUser, fetchData]);

  useEffect(() => {
    if (!sockets_url) {
      console.error("Sockets URL is not defined");
      return;
    }
    const socketIO = io(sockets_url);
    socketIO.on("getMessage", (data: { senderId: any; text: any }) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: {
          _seconds: Math.floor(Date.now() / 1000),
          _nanoseconds: (Date.now() % 1000) * 1000000,
        },
      });
    });

    socketIO.emit("addUser", currentUser.id);
    socket.current = socketIO;
  }, [currentUser, sockets_url]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.users.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat?.id) {
          const res = await axios.get(url + "/messages/" + currentChat.id);
          // Transform data
          const transformedData = res.data.map((msg: any) => {
            if (msg.createdAt && typeof msg.createdAt === "number") {
              return {
                ...msg,
                createdAt: {
                  _seconds: Math.floor(msg.createdAt / 1000),
                  _nanoseconds: (msg.createdAt % 1000) * 1000000,
                },
              };
            } else if (
              msg.createdAt &&
              msg.createdAt._seconds != null &&
              msg.createdAt._nanoseconds != null
            ) {
              return msg;
            } else {
              console.error(
                `Invalid createdAt for message: ${JSON.stringify(msg)}`
              );
              return msg;
            }
          });

          setMessages(transformedData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getMessages().catch((err) => {
      console.error(err);
    });
  }, [currentChat, url]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = async (
    selectedUser: IUser
  ): Promise<IConversation> => {
    try {
      const res = await axios.post(url + "/conversations", {
        senderId: currentUser.id,
        receiverId: selectedUser.id,
      });
      const newConversation = res.data;
      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);
      return newConversation;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const message = {
      sender: currentUser.id,
      text: newMessage,
      conversationId: currentChat?.id,
      createdAt: {
        _seconds: Math.floor(Date.now() / 1000),
        _nanoseconds: (Date.now() % 1000) * 1000000,
      },
    };

    const receiverId = currentChat?.users.find(
      (userId) => userId !== currentUser.id
    );

    socket.current?.emit("sendMessage", {
      senderId: currentUser.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(url + "/messages", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const selectUser = async (selectedUser: IUser) => {
    let conversation = conversations.find((c: IConversation) =>
      c.users.includes(selectedUser.id)
    );
    if (!conversation) {
      try {
        conversation = await startConversation(selectedUser);
      } catch (err) {
        console.error(err);
      }
    }
    setCurrentChat(conversation || null);
  };
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
          {users.map((user, i) => (
            <div key={i} onClick={() => selectUser(user)}>
              <Conversation user={user} currentUser={props.user} />
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
                    <Message message={m} own={m.sender === currentUser.id} />
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
          <Center flex="1">Open a conversation to start a chat.</Center>
        )}
      </Flex>
    </>
  );
}
