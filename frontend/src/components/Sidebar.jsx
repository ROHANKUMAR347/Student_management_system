import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome, FiUsers, FiPlus, FiMenu } from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Add Student", path: "/studentsform", icon: FiPlus },
    { name: "Student Data", path: "/studentdata", icon: FiUsers },
  ];

  const bg = useColorModeValue(
    "linear-gradient(180deg, #0f172a, #020617)",
    "linear-gradient(180deg, #0f172a, #020617)"
  );

  return (
    <Box
      h="100vh"
      bg={bg}
      color="white"
      w={isOpen ? "260px" : "80px"}
      transition="all 0.3s ease"
      position="sticky"
      top="0"
      backdropFilter="blur(20px)"
      borderRight="1px solid rgba(255,255,255,0.05)"
    >
      {/* HEADER */}
      <Flex
        align="center"
        justify={isOpen ? "space-between" : "center"}
        p={4}
      >
        {isOpen && (
          <Text
            fontSize="lg"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.300, blue.400)"
            bgClip="text"
          >
            RS Panel
          </Text>
        )}

        <IconButton
          icon={<FiMenu />}
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
        />
      </Flex>

      {/* MENU */}
      <VStack align="stretch" spacing={3} px={3} mt={6}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.name} to={item.path}>
              <MotionFlex
                align="center"
                gap={4}
                p={3}
                borderRadius="xl"
                position="relative"
                overflow="hidden"
                bg={isActive ? "whiteAlpha.200" : "transparent"}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <Box
                    position="absolute"
                    left="0"
                    top="20%"
                    bottom="20%"
                    width="4px"
                    bg="teal.400"
                    borderRadius="full"
                  />
                )}

                {/* Icon */}
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={isActive ? "teal.500" : "whiteAlpha.100"}
                  transition="0.3s"
                >
                  <Icon as={item.icon} fontSize="18px" />
                </Box>

                {/* Text */}
                {isOpen && (
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    letterSpacing="0.3px"
                  >
                    {item.name}
                  </Text>
                )}
              </MotionFlex>
            </Link>
          );
        })}
      </VStack>

      {/* FOOTER */}
      <Box position="absolute" bottom="20px" w="100%" textAlign="center">
        {isOpen && (
          <Text fontSize="xs" color="gray.500">
            © 2026 RS Dashboard
          </Text>
        )}
      </Box>
    </Box>
  );
}