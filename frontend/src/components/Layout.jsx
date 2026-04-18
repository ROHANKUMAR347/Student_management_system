import { Box, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { token, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="gray.100">
      {/* Sidebar */}
      <Box
        w="260px"
        display={{ base: "none", md: "block" }}
        bg="gray.900"
        color="white"
        position="fixed"
        h="100vh"
      >
        <Sidebar />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="white">
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <Sidebar onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main */}
      <Box ml={{ base: 0, md: "260px" }} flex="1">
        <Navbar onOpen={onOpen} token={token} logout={logout} />

        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}