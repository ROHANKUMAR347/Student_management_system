import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Heading,
  SimpleGrid,
  useToast,
  Select,
} from "@chakra-ui/react";

export default function Studentsform() {
  const { token } = useContext(AuthContext);
  const toast = useToast();

  const initialState = {
    candidateName: "",
    candidateId: "",
    course: "",
    gender: "",
    dob: "",
    contact: "",
    alternateMobile: "",
    email: "",
    fatherName: "",
    motherName: "",
    education: "",
    higherQualification: "",
    familyIncome: "",
    caste: "",
    maritalStatus: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    religion: "",
    aadhar: "",
    pancard: "",
    trainingChoice: "",
    remark: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // 🔄 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 ADD STUDENT
  const addStudent = async () => {
    if (!form.candidateName || !form.contact || !form.course) {
      return toast({
        title: "Name, Contact & Course are required",
        status: "warning",
        duration: 2000,
      });
    }

    try {
      setLoading(true);

      await API.post(
        "/students",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
          },
        }
      );

      toast({
        title: "Student Added Successfully",
        status: "success",
        duration: 2000,
      });

      setForm(initialState); // reset form
    } catch (err) {
      console.log(err.response);
      toast({
        title: err.response?.data || "Error adding student",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" flexDir={{ base: "column", md: "row" }}>
      
      {/* 🔹 SIDEBAR */}
      <Box
        w={{ base: "100%", md: "250px" }}
        bg="gray.900"
        color="white"
      >
        <Sidebar />
      </Box>

      {/* 🔹 CONTENT */}
      <Box flex="1" bg="gray.100" p={{ base: 3, md: 6 }}>
        
        <Heading mb={6} fontSize={{ base: "lg", md: "2xl" }}>
          🎓 Student Registration
        </Heading>

        <Box bg="white" p={{ base: 4, md: 6 }} rounded="2xl" shadow="lg">

          {/* BASIC INFO */}
          <Text fontWeight="bold" mb={3}>Basic Info</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <Input name="candidateName" value={form.candidateName} placeholder="Candidate Name" onChange={handleChange} />
            <Input name="candidateId" value={form.candidateId} placeholder="Candidate ID" onChange={handleChange} />

            <Select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>

            <Input type="date" name="dob" value={form.dob} onChange={handleChange} />
          </SimpleGrid>

          {/* CONTACT */}
          <Text fontWeight="bold" mb={3}>Contact Info</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <Input name="contact" value={form.contact} placeholder="Contact Number" onChange={handleChange} />
            <Input name="alternateMobile" value={form.alternateMobile} placeholder="Alternate Mobile" onChange={handleChange} />
            <Input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
          </SimpleGrid>

          {/* EDUCATION */}
          <Text fontWeight="bold" mb={3}>Education</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <Input name="education" value={form.education} placeholder="Education" onChange={handleChange} />
            <Input name="higherQualification" value={form.higherQualification} placeholder="Higher Qualification" onChange={handleChange} />

            <Select name="course" value={form.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>Digital Marketing</option>
              <option>Graphic Design</option>
              <option>Cyber Security</option>
              <option>AI / ML</option>
            </Select>
          </SimpleGrid>

          {/* FAMILY */}
          <Text fontWeight="bold" mb={3}>Family Info</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <Input name="fatherName" value={form.fatherName} placeholder="Father Name" onChange={handleChange} />
            <Input name="motherName" value={form.motherName} placeholder="Mother Name" onChange={handleChange} />
            <Input name="familyIncome" value={form.familyIncome} placeholder="Family Income" onChange={handleChange} />
          </SimpleGrid>

          {/* ADDRESS */}
          <Text fontWeight="bold" mb={3}>Address</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
            <Input name="address" value={form.address} placeholder="Address" onChange={handleChange} />
            <Input name="state" value={form.state} placeholder="State" onChange={handleChange} />
            <Input name="district" value={form.district} placeholder="District" onChange={handleChange} />
            <Input name="pincode" value={form.pincode} placeholder="Pincode" onChange={handleChange} />
          </SimpleGrid>

          {/* EXTRA */}
          <Text fontWeight="bold" mb={3}>Other Details</Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Input name="aadhar" value={form.aadhar} placeholder="Aadhar No" onChange={handleChange} />
            <Input name="pancard" value={form.pancard} placeholder="PAN Card" onChange={handleChange} />
            <Input name="caste" value={form.caste} placeholder="Caste" onChange={handleChange} />
            <Input name="religion" value={form.religion} placeholder="Religion" onChange={handleChange} />

            <Select name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
              <option value="">Marital Status</option>
              <option>Single</option>
              <option>Married</option>
            </Select>

            <Input name="trainingChoice" value={form.trainingChoice} placeholder="Training Choice" onChange={handleChange} />
            <Input name="remark" value={form.remark} placeholder="Remark" onChange={handleChange} />
          </SimpleGrid>

          {/* BUTTON */}
          <Button
            mt={8}
            colorScheme="green"
            width="full"
            onClick={addStudent}
            isLoading={loading}
          >
            Save Student
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}