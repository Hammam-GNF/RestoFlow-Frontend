import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Orders
      </Typography>

      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={order.id}>
            <Card
              onClick={() => navigate(`/orders/${order.id}`)}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  order.status === "open"
                    ? "#fff8e1"
                    : "#e8f5e9",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Order #{order.id}
                </Typography>
                <Typography>
                  Table: {order.table?.number}
                </Typography>
                <Typography>
                  Status: {order.status}
                </Typography>
                <Typography>
                  Total: Rp {order.total_price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}