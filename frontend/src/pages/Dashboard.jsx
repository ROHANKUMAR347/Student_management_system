

import { useEffect, useState, useContext } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  Center,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { FiUsers, FiUserPlus, FiDatabase } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Card = ({ title, value, icon }) => (
  <Flex
    p={5}
    bg="white"
    borderRadius="xl"
    boxShadow="lg"
    justify="space-between"
    align="center"
    _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
    transition="0.3s"
  >
    <Box>
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
    </Box>

    <Box fontSize="30px" color="teal.500">
      {icon}
    </Box>
  </Flex>
);

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 📡 Fetch Data
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 📊 Monthly Chart Data
  const monthlyData = Object.values(
    students.reduce((acc, student) => {
      const month = new Date(student.createdAt).toLocaleString("default", {
        month: "short",
      });

      acc[month] = acc[month] || { month, count: 0 };
      acc[month].count += 1;

      return acc;
    }, {})
  );

  // 📅 Last 7 Days
  const recentStudents = students.filter(
    (s) =>
      new Date(s.createdAt) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  // ⏳ Loading
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex minH="100vh"   flexDir={{ base: "column", md: "row" }}>
      {/* 🔹 SIDEBAR */}
      <Box w={{ base: "70px", md: "250px" }} bg="gray.900" color="white">
        <Sidebar />
      </Box>

      {/* 🔹 MAIN CONTENT */}
      <Box flex="1" bg="gray.100">
        {/* 🔝 TOP BAR */}
        <Flex
          bg="white"
          p={4}
          justify="space-between"
          align="center"
          boxShadow="sm"
        >
          <Text fontWeight="bold" fontSize="xl">
            Dashboard
          </Text>

          <Flex align="center" gap={3}>
            <Avatar size="sm" />

            {token ? (
              <Button size="sm" colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Flex>
        </Flex>

        {/* 📦 CONTENT */}
        <Box p={6}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Welcome Back 👋
          </Text>

          {/* 📊 CARDS */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card
              title="Total Students"
              value={students.length}
              icon={<FiUsers />}
            />

            <Card
              title="New (Last 7 Days)"
              value={recentStudents.length}
              icon={<FiUserPlus />}
            />

            <Card
              title="Total Records"
              value={students.length}
              icon={<FiDatabase />}
            />
          </SimpleGrid>

          {/* 📈 CHART */}
          <Box mt={10} bg="white" p={5} borderRadius="xl" boxShadow="lg">
            <Text mb={4} fontWeight="bold">
              Students Growth (Monthly)
            </Text>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}