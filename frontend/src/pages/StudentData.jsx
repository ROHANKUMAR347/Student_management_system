import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
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
} from "@chakra-ui/react";

import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";

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
    <Flex minH="100vh" flexDir={{ base: "column", md: "row" }}>
      
      {/* SIDEBAR */}
      <Box w={{ base: "100%", md: "250px" }} bg="gray.900" color="white">
        <Sidebar />
      </Box>

      {/* MAIN */}
      <Box flex="1" bg="gray.100" p={{ base: 3, md: 6 }}>
        
        {/* HEADER */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          flexDir={{ base: "column", md: "row" }}
          gap={3}
          mb={6}
        >
          <Heading fontSize={{ base: "lg", md: "2xl" }}>
            📋 Student Records
          </Heading>

          <InputGroup maxW={{ base: "100%", md: "300px" }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Search name or ID"
              bg="white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>

        {/* TABLE */}
        <Box
          bg="white"
          p={{ base: 3, md: 5 }}
          rounded="xl"
          shadow="md"
          overflowX="auto"
        >
          {filtered.length === 0 ? (
            <Text textAlign="center" py={10} color="gray.500">
              No students found 😔
            </Text>
          ) : (
            <Table size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Name</Th>
                  <Th>ID</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Course
                  </Th>
                  <Th>Contact</Th>
                  <Th display={{ base: "none", md: "table-cell" }}>
                    Gender
                  </Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {filtered.map((s) => (
                  <Tr key={s._id} _hover={{ bg: "gray.50" }}>
                    <Td fontWeight="medium">{s.candidateName}</Td>
                    <Td>{s.candidateId}</Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {s.course}
                    </Td>
                    <Td>{s.contact}</Td>
                    <Td display={{ base: "none", md: "table-cell" }}>
                      {s.gender}
                    </Td>

                    <Td>
                      <Flex gap={2} justify="center">
                        {/* VIEW */}
                        <Button
                          size="xs"
                          colorScheme="blue"
                          onClick={() => navigate(`/student/${s._id}`)}
                        >
                          <FiEye />
                        </Button>

                        {/* DELETE */}
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => {
                            if (!window.confirm("Delete this student?")) return;
                            deleteStudent(s._id);
                          }}
                        >
                          <FiTrash2 />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Flex>
  );
}