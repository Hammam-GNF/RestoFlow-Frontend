import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, Box, Grid } from "@mui/material";
import { getTables } from "../api/tableApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [tables, setTables] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTables();
      setTables(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

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

      <Typography variant="h6" mt={4} mb={2}>
        Tables
      </Typography>

      <Grid container spacing={2}>
        {tables.map((table) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={table.id}>
            <Card
              sx={{
                cursor: "pointer",
                backgroundColor:
                  table.status === "occupied" ? "#ffebee" : "#e8f5e9",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Table {table.number}
                </Typography>
                <Typography>
                  Status: {table.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}