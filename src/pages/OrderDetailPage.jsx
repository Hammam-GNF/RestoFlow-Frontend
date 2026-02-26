import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import { getOrderDetail } from "../api/orderApi";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrderDetail(id);
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Order #{order.id}
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
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

      <Typography variant="h6" mb={1}>
        Items
      </Typography>

      {order.order_items?.map((item) => (
        <Card key={item.id} sx={{ mb: 1 }}>
          <CardContent>
            <Typography>
              {item.food_name}
            </Typography>
            <Typography>
              Qty: {item.quantity}
            </Typography>
            <Typography>
              Price: Rp {item.price}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {order.order_items?.length === 0 && (
        <Typography>No items yet</Typography>
      )}
    </Container>
  );
}