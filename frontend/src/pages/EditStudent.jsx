import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Heading,
  SimpleGrid,
  Flex,
  useToast,
  Spinner,
  Center,
  Select,
} from "@chakra-ui/react";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function EditStudent() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch student data
  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to load student",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStudent();
  }, [token]);

  // ✏️ Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Update student
  const updateStudent = async () => {
    try {
      await API.put(`/students/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Student updated successfully",
        status: "success",
      });

      navigate(`/student/${id}`);
    } catch (err) {
      console.log(err);
      toast({
        title: "Update failed",
        status: "error",
      });
    }
  };

  // ⏳ Loading
  if (loading || !form) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex minH="100vh" direction={{ base: "column", md: "row" }}>
      
      {/* SIDEBAR */}
      <Box w={{ base: "100%", md: "260px" }} bg="gray.900">
        <Sidebar />
      </Box>

      {/* MAIN */}
      <Box flex="1" bg="gray.100" p={6}>
        <Heading mb={6}>✏ Edit Student</Heading>

        <Box bg="white" p={6} rounded="2xl" shadow="md">

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>

            <Input name="candidateName" value={form.candidateName || ""} placeholder="Name" onChange={handleChange} />

            <Input name="candidateId" value={form.candidateId || ""} placeholder="ID" onChange={handleChange} />

            <Select name="course" value={form.course || ""} onChange={handleChange}>
              <option value="">Select Course</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>AI/ML</option>
            </Select>

            <Select name="gender" value={form.gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Select>

            <Input type="date" name="dob" value={form.dob || ""} onChange={handleChange} />

            <Select name="maritalStatus" value={form.maritalStatus || ""} onChange={handleChange}>
              <option value="">Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </Select>

            <Input name="contact" value={form.contact || ""} placeholder="Contact" onChange={handleChange} />

            <Input name="email" value={form.email || ""} placeholder="Email" onChange={handleChange} />

            <Input name="fatherName" value={form.fatherName || ""} placeholder="Father Name" onChange={handleChange} />

            <Input name="motherName" value={form.motherName || ""} placeholder="Mother Name" onChange={handleChange} />

            <Input name="address" value={form.address || ""} placeholder="Address" onChange={handleChange} />

            <Input name="pincode" value={form.pincode || ""} placeholder="Pincode" onChange={handleChange} />

          </SimpleGrid>

          {/* BUTTON */}
          <Button
            mt={6}
            colorScheme="teal"
            width="full"
            onClick={updateStudent}
          >
            Update Student
          </Button>

          <Button
            mt={3}
            width="full"
            variant="outline"
            onClick={() => navigate(`/student/${id}`)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}