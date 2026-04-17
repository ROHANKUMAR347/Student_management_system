// // import { Box, Text, Flex } from "@chakra-ui/react";
// // import { Link } from "react-router-dom";
// // import { useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";

// // export default function Sidebar() {
// //   const { token } = useContext(AuthContext);

// //   return (
// //     <Box
// //       w={{ base: "100%", md: "250px" }}
// //       bg="gray.800"
// //       color="white"
// //       p={5}
// //       minH="100vh"
// //     >
// //       <Text fontSize="xl" mb={5}>SKILL ODISHA</Text>

// //       <Flex direction="column" justify={"center"}  gap={3}>
        
// //         {/* Public */}
// //         <Link to="/">Dashboard</Link>

// //         {/* Protected Links */}
// //         {token ? (
// //           <>
// //             <Link to="/studentsform">Student Registration</Link>
// //             <Link to="/studentdata">Existing Students Data</Link>
// //           </>
// //         ) : (
// //           <Text fontSize="sm" color="gray.400">
// //             🔒 Login to manage students
// //           </Text>
// //         )}
// //       </Flex>
// //     </Box>
// //   );
// // }

// import {
//   Box,
//   Text,
//   Flex,
//   Icon,
//   Avatar,
//   Button,
//   Divider,
//   useBreakpointValue,
// } from "@chakra-ui/react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// import {
//   FiHome,
//   FiUserPlus,
//   FiUsers,
//   FiLogOut,
// } from "react-icons/fi";

// export default function Sidebar() {
//   const { token, logout } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isMobile = useBreakpointValue({ base: true, md: false });

//   const NavItem = ({ to, icon, children }) => {
//     const isActive = location.pathname === to;

//     return (
//       <Link to={to}>
//         <Flex
//           align="center"
//           gap={3}
//           p={3}
//           borderRadius="lg"
//           bg={isActive ? "teal.500" : "transparent"}
//           _hover={{ bg: "teal.600" }}
//           transition="0.3s"
//         >
//           <Icon as={icon} />
//           {!isMobile && <Text>{children}</Text>}
//         </Flex>
//       </Link>
//     );
//   };

//   return (
//     <Flex
//       direction="column"
//       justify="space-between"
//       w={isMobile ? "100%" : "260px"}
//       minH={isMobile ? "auto" : "100vh"}
//       bgGradient="linear(to-b, gray.900, gray.800)"
//       color="white"
//       p={5}
//     >
//       {/* TOP */}
//       <Box>
//         <Text
//           fontSize="2xl"
//           fontWeight="bold"
//           mb={8}
//           bgGradient="linear(to-r, teal.300, cyan.400)"
//           bgClip="text"
//           textAlign={isMobile ? "center" : "left"}
//         >
//           SKILL ODISHA
//         </Text>

//         <Flex
//           direction={isMobile ? "row" : "column"}
//           gap={3}
//           justify={isMobile ? "space-around" : "flex-start"}
//         >
//           <NavItem to="/" icon={FiHome}>Dashboard</NavItem>

//           {token && (
//             <>
//               <NavItem to="/studentsform" icon={FiUserPlus}>
//                 Register
//               </NavItem>

//               <NavItem to="/studentdata" icon={FiUsers}>
//                 Students
//               </NavItem>
//             </>
//           )}
//         </Flex>
//       </Box>

//       {/* BOTTOM PROFILE */}
//       {token && (
//         <Box mt={5}>
//           <Divider mb={4} />

//           <Flex align="center" gap={3} mb={3}>
//             <Avatar size="sm" name="User" />
//             {!isMobile && (
//               <Box>
//                 <Text fontSize="sm">Welcome</Text>
//                 <Text fontSize="xs" color="gray.400">
//                   user@email.com
//                 </Text>
//               </Box>
//             )}
//           </Flex>

//           <Button
//             size="sm"
//             width="full"
//             leftIcon={<FiLogOut />}
//             colorScheme="red"
//             variant="outline"
//             onClick={() => {
//               logout();
//               navigate("/");
//             }}
//           >
//             Logout
//           </Button>
//         </Box>
//       )}
//     </Flex>
//   );
// }




import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUsers,
  FiPlus,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: FiHome },
    { name: "Add Student", path: "/studentsform", icon: FiPlus },
    { name: "Student Data", path: "/studentdata", icon: FiUsers },
  ];

  const bg = useColorModeValue("gray.900", "gray.900");
  const activeBg = "teal.500";

  return (
    <Box
      h="100vh"
      bg={bg}
      color="white"
      transition="0.3s"
      w={isOpen ? "240px" : "70px"}
      position="sticky"
      top="0"
    >
      {/* HEADER */}
      <Flex
        align="center"
        justify={isOpen ? "space-between" : "center"}
        p={4}
      >
        {isOpen && (
          <Text fontSize="lg" fontWeight="bold">
            RS Panel
          </Text>
        )}

        <IconButton
          icon={<FiMenu />}
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          color="white"
        />
      </Flex>

      {/* MENU */}
      <VStack align="stretch" spacing={2} px={2} mt={4}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.name} to={item.path}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="lg"
                bg={isActive ? activeBg : "transparent"}
                _hover={{ bg: "teal.600" }}
                transition="0.2s"
              >
                <Icon as={item.icon} fontSize="20px" />

                {isOpen && (
                  <Text fontSize="sm" fontWeight="medium">
                    {item.name}
                  </Text>
                )}
              </Flex>
            </Link>
          );
        })}
      </VStack>

      {/* FOOTER */}
      <Box position="absolute" bottom="10px" w="100%" textAlign="center">
        {isOpen && (
          <Text fontSize="xs" color="gray.400">
            © 2026 RS Dashboard
          </Text>
        )}
      </Box>
    </Box>
  );
}