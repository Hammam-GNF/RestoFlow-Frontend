import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { getOrderDetail, addItemToOrder } from "../api/orderApi";
import { getFoods } from "../api/foodApi";
import { useAuth } from "../context/AuthContext";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    food_id: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchOrder();
    fetchFoods();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrderDetail(id);
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await getFoods();
      setFoods(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = async () => {
    try {
      await addItemToOrder(id, form);
      setForm({
        food_id: "",
        quantity: 1,
      });
      fetchOrder();
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

        {user.role === "pelayan" && order.status === "open" && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Add Item
              </Typography>

              <TextField
                select
                fullWidth
                label="Food"
                name="food_id"
                value={form.food_id}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                {foods.map((food) => (
                  <MenuItem key={food.id} value={food.id}>
                    {food.name} - Rp {food.price}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
                disabled={!form.food_id || form.quantity < 1}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        )}

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