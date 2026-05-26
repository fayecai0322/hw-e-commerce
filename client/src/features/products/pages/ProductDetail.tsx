import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { useAddCartItem } from "../../cart/hooks/useCart";
import { useAuth } from "../../auth/context/AuthContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id ?? "");
  const addCartItemMutation = useAddCartItem();
  const {isAuthenticated} = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Container size="lg" py="xl">
        <ErrorMessage message={error.message} />
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image src={product.thumbnail} alt={product.title} height={400} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} mb="md">
            {product.title}
          </Title>
          <Group mb="md">
            <Badge size="lg" color="pink">
              ${product.price.toFixed(2)}
            </Badge>
            <Badge size="lg" color="blue">
              {product.category}
            </Badge>
          </Group>
          <Text size="lg" mb="md">
            {product.description}
          </Text>
          <Text size="md" mb="xl" c="dimmed">
            Stock: {product.stock} units available
          </Text>
          <Group>
            <Button
              size="lg"
              loading={addCartItemMutation.isPending}
              onClick={() =>{
                if (!isAuthenticated){
                  navigate("/login");
                  return;
                }
                addCartItemMutation.mutate({
                  productId: product.id,
                  quantity: 1,
                })
              }
            }
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
