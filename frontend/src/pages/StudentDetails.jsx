

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Flex,
  Button,
  Avatar,
  Divider,
  Badge,
  Icon,
} from "@chakra-ui/react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBook,
  FiHome,
} from "react-icons/fi";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import Layout from "../components/Layout";

export default function StudentDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Info Row Component
  const Info = ({ icon, label, value }) => (
    <Flex align="center" justify="space-between" py={2}>
      <Flex align="center" gap={2}>
        <Icon as={icon} color="teal.500" />
        <Text color="gray.500">{label}</Text>
      </Flex>
      <Text fontWeight="medium">{value || "-"}</Text>
    </Flex>
  );

  // 🔥 Fetch student
  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudent(res.data);
    } catch (err) {
      console.log(err);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && id) fetchStudent();
  }, [token, id]);

  // ⏳ Loading
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // ❌ Not found
  if (!student) {
    return (
      <Center h="100vh">
        <Text color="red.500">Student not found 😔</Text>
      </Center>
    );
  }

  return (

    <Layout>
    
      
     

      {/* MAIN */}
      <Box flex="1" bg="gray.50" p={{ base: 3, md: 6 }}>

        {/* HEADER */}
        <Flex justify="space-between" align="center" mb={6} wrap="wrap">
          <Heading fontSize={{ base: "lg", md: "2xl" }}>
            🎓 Student Profile
          </Heading>

          <Flex gap={2}>
            <Button size="sm" onClick={() => navigate("/studentdata")}>
              ⬅ Back
            </Button>

            <Button
              size="sm"
              colorScheme="yellow"
              onClick={() => navigate(`/edit-student/${student._id}`)}
            >
              ✏ Edit
            </Button>
          </Flex>
        </Flex>

        {/* PROFILE CARD */}
        <Box
          bg="white"
          p={6}
          rounded="2xl"
          shadow="md"
          mb={6}
        >
          <Flex align="center" gap={4} wrap="wrap">
            <Avatar size="xl" name={student.candidateName} />

            <Box>
              <Heading size="md">{student.candidateName}</Heading>
              <Text color="gray.500">{student.email}</Text>

              <Flex mt={2} gap={2}>
                <Badge colorScheme="teal">{student.course}</Badge>
                <Badge colorScheme="purple">{student.gender}</Badge>
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* GRID */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>

          {/* BASIC */}
          <Box bg="white" p={5} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={3}>Basic Info</Heading>
            <Divider />
            <Info icon={FiBook} label="Course" value={student.course} />
            <Info icon={FiUser} label="Gender" value={student.gender} />
            <Info icon={FiUser} label="DOB" value={student.dob} />
            <Info icon={FiUser} label="Marital" value={student.maritalStatus} />
          </Box>

          {/* CONTACT */}
          <Box bg="white" p={5} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={3}>Contact</Heading>
            <Divider />
            <Info icon={FiPhone} label="Phone" value={student.contact} />
            <Info icon={FiMail} label="Email" value={student.email} />
            <Info icon={FiMapPin} label="Address" value={student.address} />
            <Info icon={FiMapPin} label="Pincode" value={student.pincode} />
          </Box>

          {/* FAMILY */}
          <Box bg="white" p={5} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={3}>Family</Heading>
            <Divider />
            <Info icon={FiHome} label="Father" value={student.fatherName} />
            <Info icon={FiHome} label="Mother" value={student.motherName} />
            <Info icon={FiHome} label="Income" value={student.familyIncome} />
          </Box>

          {/* OTHER */}
          <Box bg="white" p={5} rounded="2xl" shadow="sm">
            <Heading size="sm" mb={3}>Other</Heading>
            <Divider />
            <Info label="Aadhar" value={student.aadhar} />
            <Info label="PAN" value={student.pancard} />
            <Info label="Caste" value={student.caste} />
            <Info label="Religion" value={student.religion} />
            <Info label="Training" value={student.trainingChoice} />
            <Info label="Remark" value={student.remark} />
          </Box>

        </SimpleGrid>
      </Box>
   
    </Layout>
  );
}