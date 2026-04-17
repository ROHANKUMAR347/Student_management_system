// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Input,
//   Flex,
//   Text,
//   Heading,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!form.name || !form.email || !form.password) {
//       return toast({
//         title: "All fields required",
//         status: "warning",
//         duration: 2000,
//       });
//     }

//     try {
//       setLoading(true);

//       await API.post("/auth/register", form);

//       toast({
//         title: "Registered successfully",
//         status: "success",
//         duration: 2000,
//       });

//       navigate("/login");
//     } catch (err) {
//       toast({
//         title: err.response?.data || "Registration failed",
//         status: "error",
//         duration: 2000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Flex h="100vh" align="center" justify="center" bg="gray.100">
//       <Box p={8} bg="white" shadow="lg" rounded="xl" w="350px">
//         <VStack spacing={4}>
//           <Heading size="lg">Register</Heading>

//           <Input
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />

//           <Input
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />

//           <Input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           <Button
//             colorScheme="green"
//             w="full"
//             isLoading={loading}
//             onClick={handleRegister}
//           >
//             Register
//           </Button>

//           <Text fontSize="sm">
//             Already have an account?{" "}
//             <span
//               style={{ color: "blue", cursor: "pointer" }}
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </span>
//           </Text>
//         </VStack>
//       </Box>
//     </Flex>
//   );


import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Heading,
  VStack,
  useToast,
  Checkbox,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import RSLogo from "../components/RSLogo";

const MotionBox = motion(Box);

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast({
        title: "All fields required",
        status: "warning",
        duration: 2000,
      });
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      toast({
        title: "Registered successfully",
        status: "success",
        duration: 2000,
      });

      navigate("/login");
    } catch (err) {
      toast({
        title: err.response?.data || "Registration failed",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, teal.500, pink.400)"
      p={4}
    >
      <Flex
        w="full"
        maxW="950px"
        bg="whiteAlpha.900"
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
        direction={isMobile ? "column" : "row"}
      >
        {/* LEFT SIDE */}
        <Flex
          flex="1"
          bgGradient="linear(to-br, teal.600, teal.800)"
          color="white"
          direction="column"
          justify="center"
          align="center"
          p={10}
          textAlign="center"
        >
          <RSLogo size={200} />

          <Heading mt={6} size="md">
            Join Us 🚀
          </Heading>

          <Text fontSize="sm" mt={2} opacity={0.8}>
            Create your account and start managing everything easily.
          </Text>

          <Button
            mt={6}
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: "white", color: "teal.700" }}
            borderRadius="full"
            px={8}
          >
            Learn More
          </Button>
        </Flex>

        {/* RIGHT SIDE */}
        <MotionBox
          flex="1"
          p={{ base: 6, md: 10 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Heading size="lg" mb={2} color="teal.600">
            Register
          </Heading>

          <Text fontSize="sm" mb={6} color="gray.500">
            Create your account to continue.
          </Text>

          <VStack spacing={5}>
            <Input
              variant="flushed"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <Input
              variant="flushed"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <Input
              variant="flushed"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </VStack>

          {/* EXTRA */}
          <Flex mt={4} fontSize="sm">
            <Checkbox colorScheme="teal">
              I agree to terms & conditions
            </Checkbox>
          </Flex>

          {/* BUTTON */}
          <Button
            mt={8}
            width="full"
            borderRadius="full"
            bgGradient="linear(to-r, teal.400, teal.600)"
            color="white"
            _hover={{ opacity: 0.9 }}
            isLoading={loading}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Text mt={6} fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Text
              as="span"
              color="teal.500"
              cursor="pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
          </Text>
        </MotionBox>
      </Flex>
    </Flex>
  );
}
