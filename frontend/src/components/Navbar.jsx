import {
  Flex,
  Text,
  Avatar,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onOpen, token, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      bg="whiteAlpha.900"
      backdropFilter="blur(10px)"
      px={{ base: 4, md: 6 }}
      py={4}
      justify="space-between"
      align="center"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      {/* 📱 MOBILE MENU */}
      <IconButton
        icon={<FiMenu />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="ghost"
        fontSize="22px"
      />

      {/* 🧾 TITLE */}
      <Text fontWeight="bold" fontSize="xl">
        Dashboard
      </Text>

      {/* 👤 USER SECTION */}
      <HStack spacing={4}>
        <Avatar size="sm" />

        {token ? (
          <Button
            size="sm"
            colorScheme="red"
            borderRadius="full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            size="sm"
            colorScheme="teal"
            borderRadius="full"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </HStack>
    </Flex>
  );
}