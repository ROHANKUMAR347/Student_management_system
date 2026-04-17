import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Studentsform from "./pages/StudentForm";
import StudentData from "./pages/StudentData";
import StudentDetails from "./pages/StudentDetails";
import EditStudent from "./pages/EditStudent";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/studentsform" element={<PrivateRoute><Studentsform /></PrivateRoute>} />
            <Route path="/studentdata" element={<PrivateRoute><StudentData /></PrivateRoute>} />
            <Route path="/student/:id" element={<PrivateRoute><StudentDetails /></PrivateRoute>} />
            <Route
              path="/edit-student/:id"
              element={
                <PrivateRoute>
                  <EditStudent />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}
