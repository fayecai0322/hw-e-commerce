import { Button, Card, Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { Spinner } from "../../../components/ui/Spinner";
import { useCart, useClearCart, useRemoveCartItem } from "../hooks/useCart";

const Cart = () => {
  const { data: cart, isLoading, isError, error } = useCart();
  const removeCartItemMutation = useRemoveCartItem();
  const clearCartMutation = useClearCart();

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

  if (!cart || cart.products.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Title order={1} mb="xl">
          Shopping Cart
        </Title>
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Text size="lg">Your cart is empty</Text>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Shopping Cart</Title>
        <Button
          color="red"
          variant="outline"
          onClick={() => clearCartMutation.mutate()}
        >
          Clear Cart
        </Button>
      </Group>

      <Stack>
        {cart.products.map((item) => (
          <Card key={item.id} shadow="sm" padding="md" radius="md" withBorder>
            <Group align="center">
              <Image src={item.thumbnail} alt={item.title} w={80} h={80} />

              <div style={{ flex: 1 }}>
                <Text fw={600}>{item.title}</Text>
                <Text size="sm" c="dimmed">
                  Quantity: {item.quantity}
                </Text>
                <Text size="sm">
                  ${item.discountedTotal.toFixed(2)}
                </Text>
              </div>

              <Button
                color="red"
                variant="subtle"
                onClick={() =>
                  removeCartItemMutation.mutate({ productId: item.id })
                }
              >
                Remove
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>

      <Card mt="xl" shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Text fw={700}>Total</Text>
          <Text fw={700}>${cart.discountedTotal.toFixed(2)}</Text>
        </Group>
      </Card>
    </Container>
  );
};

export default Cart;

