import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export default function OrderDetailPage() {
  const { id } = useParams();

  return (
    <Container>
      <Typography variant="h4" mt={4}>
        Order Detail - ID {id}
      </Typography>
    </Container>
  );
}