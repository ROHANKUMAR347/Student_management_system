import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
  Badge,
} from "@chakra-ui/react";

import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import Layout from "../components/Layout";

export default function StudentData() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  // 🔄 FETCH
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ❌ DELETE
  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 FILTER
  const filtered = students.filter(
    (s) =>
      s.candidateName?.toLowerCase().includes(search.toLowerCase()) ||
      s.candidateId?.includes(search)
  );

  return (
    <Layout>
      <Box
        p={{ base: 4, md: 8 }}
        bgGradient="linear(to-br, gray.100, teal.50)"
        minH="calc(100vh - 70px)"
      >
        {/* 🔝 HEADER */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          flexDir={{ base: "column", md: "row" }}
          gap={4}
          mb={6}
        >
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            📋 Student Records
          </Heading>

          <InputGroup maxW={{ base: "100%", md: "320px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Search name or ID..."
              bg="white"
              borderRadius="full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>

        {/* 📦 CARD CONTAINER */}
        <Box
          bg="white"
          p={{ base: 3, md: 6 }}
          rounded="2xl"
          shadow="lg"
        >
          {/* ❌ NO DATA */}
          {filtered.length === 0 ? (
            <Text textAlign="center" py={10} color="gray.500">
              No students found 😔
            </Text>
          ) : (
            <>
              {/* 📱 MOBILE VIEW (CARD) */}
              <Box display={{ base: "block", md: "none" }}>
                {filtered.map((s) => (
                  <Box
                    key={s._id}
                    p={4}
                    mb={4}
                    bg="gray.50"
                    rounded="xl"
                    shadow="sm"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "md",
                    }}
                    transition="all 0.25s ease"
                  >
                    <Text fontWeight="bold" fontSize="md">
                      {s.candidateName}
                    </Text>

                    <Text fontSize="sm" color="gray.600">
                      ID: {s.candidateId}
                    </Text>

                    <Text fontSize="sm">
                      📞 {s.contact}
                    </Text>

                    <Flex mt={2} gap={2}>
                      <Badge colorScheme="teal">{s.course}</Badge>
                      <Badge colorScheme="purple">{s.gender}</Badge>
                    </Flex>

                    <Flex mt={3} gap={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        flex="1"
                        onClick={() => navigate(`/student/${s._id}`)}
                      >
                        <FiEye />
                      </Button>

                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        flex="1"
                        onClick={() => {
                          if (!window.confirm("Delete this student?"))
                            return;
                          deleteStudent(s._id);
                        }}

                        _hover={{
                          transform: "scale(1.05)",
                        }}
                        transition="0.2s"
                      >
                        <FiTrash2 />
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </Box>

              {/* 💻 DESKTOP TABLE */}
              <Box
                display={{ base: "none", md: "block" }}
                w="100%"
                overflowX="auto"
                sx={{
                  "&::-webkit-scrollbar": { height: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#CBD5E0",
                    borderRadius: "24px",
                  },
                }}
              >
                <Table variant="simple" size="md" minW="700px">
                  <Thead bg="gray.100">
                    <Tr>
                      <Th>Name</Th>
                      <Th>ID</Th>
                      <Th>Course</Th>
                      <Th>Contact</Th>
                      <Th>Gender</Th>
                      <Th textAlign="center">Actions</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {filtered.map((s) => (
                      <Tr
                        key={s._id}
                        _hover={{
                          bg: "gray.50",
                          transform: "scale(1.01)",
                          boxShadow: "md",
                        }}
                        transition="all 0.2s ease"
                      >
                        <Td fontWeight="semibold">
                          {s.candidateName}
                        </Td>
                        <Td>{s.candidateId}</Td>
                        <Td>
                          <Badge colorScheme="teal">
                            {s.course}
                          </Badge>
                        </Td>
                        <Td>{s.contact}</Td>
                        <Td>
                          <Badge colorScheme="purple">
                            {s.gender}
                          </Badge>
                        </Td>

                        <Td>
                          <Flex gap={2} justify="center">
                            <Button
                              size="sm"
                              colorScheme="blue"
                              variant="outline"
                              borderRadius="full"
                              onClick={() =>
                                navigate(`/student/${s._id}`)
                              }
                            >
                              <FiEye />
                            </Button>

                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              borderRadius="full"
                              onClick={() => {
                                if (!window.confirm("Delete this student?"))
                                  return;
                                deleteStudent(s._id);
                              }}
                              _hover={{
                                backgroundColor:"red",
                                color:"white",
                                transform: "scale(1.05)",
                              }}
                              transition="0.2s"
                            >
                              <FiTrash2 />
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
}