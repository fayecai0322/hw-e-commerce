import { Badge, Button, Card, Group, Text, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product.thumbnail} alt={product.title} height={160} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} lineClamp={1} style={{ flex: 1 }}>
          {product.title}
        </Text>

        <Group gap="xs">
          <Badge color="pink">${discountedPrice.toFixed(2)}</Badge>
          <Text size="sm" c="dimmed" td="line-through">
            ${product.price.toFixed(2)}
          </Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2}>
        {product.description}
      </Text>

      <Group>
        <Text size="sm" mt="xs">
          Stock: {product.stock}
        </Text>
        <Text size="sm" mt="xs">
          Rating: {product.rating}
        </Text>
      </Group>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
};
