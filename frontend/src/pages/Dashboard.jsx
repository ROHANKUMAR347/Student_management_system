import { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  Center,
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
import Layout from "../components/Layout";

/* 🔹 CARD COMPONENT */
const Card = ({ title, value, icon }) => (
  <Flex
    p={6}
    borderRadius="2xl"
    bg="whiteAlpha.800"
    backdropFilter="blur(12px)"
    boxShadow="lg"
    justify="space-between"
    align="center"
    transition="0.3s"
    _hover={{
      transform: "translateY(-6px) scale(1.02)",
      boxShadow: "2xl",
    }}
  >
    <Box>
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {value}
      </Text>
    </Box>

    <Box
      fontSize="34px"
      color="white"
      bg="teal.500"
      p={3}
      borderRadius="full"
    >
      {icon}
    </Box>
  </Flex>
);

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 📡 FETCH STUDENTS */
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

  /* 📊 MONTHLY DATA */
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

  /* 📅 LAST 7 DAYS */
  const recentStudents = students.filter(
    (s) =>
      new Date(s.createdAt) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  /* ⏳ LOADING */
  if (loading) {
    return (
      <Layout>
        <Center h="70vh">
          <Spinner size="xl" thickness="4px" color="teal.400" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 📦 CONTENT */}
      <Box
        p={{ base: 4, md: 8 }}
        bgGradient="linear(to-br, gray.100, teal.50)"
        minH="calc(100vh - 70px)"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
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
        <Box
          mt={10}
          p={6}
          borderRadius="2xl"
          bg="whiteAlpha.900"
          backdropFilter="blur(10px)"
          boxShadow="lg"
        >
          <Text mb={4} fontWeight="bold" fontSize="lg">
            Students Growth (Monthly)
          </Text>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Layout>
  );
}