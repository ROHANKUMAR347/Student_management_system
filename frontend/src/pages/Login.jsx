
import { useContext, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import RSLogo from "../components/RSLogo";

const MotionBox = motion(Box);

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast({
        title: "All fields required",
        status: "warning",
        duration: 2000,
      });
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      login(res.data.token);

      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
      });

      navigate("/");
    } catch (err) {
      toast({
        title: err.response?.data || "Login failed",
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
            Welcome Back 👋
          </Heading>

          <Text fontSize="sm" mt={2} opacity={0.8}>
            Login to access your dashboard and manage everything easily.
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
            Login
          </Heading>

          <Text fontSize="sm" mb={6} color="gray.500">
            Welcome back! Please enter your details.
          </Text>

          <VStack spacing={5}>
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

          {/* OPTIONS */}
          <Flex justify="space-between" mt={4} fontSize="sm">
            <Checkbox colorScheme="teal">Remember me</Checkbox>
            <Link color="teal.500">Forgot Password?</Link>
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
            onClick={handleLogin}
          >
            Login
          </Button>

          <Text mt={6} fontSize="sm" textAlign="center">
            Don't have an account?{" "}
            <Text
              as="span"
              color="teal.500"
              cursor="pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </Text>
          </Text>
        </MotionBox>
      </Flex>
    </Flex>
  );
}