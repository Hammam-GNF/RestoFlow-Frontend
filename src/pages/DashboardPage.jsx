import { Typography, Container, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Typography variant="h5">
          Welcome, {user?.name} ({user?.role})
        </Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}