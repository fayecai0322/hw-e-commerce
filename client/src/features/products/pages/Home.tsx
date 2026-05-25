import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconCategory } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import HomeInfoSection from "../../../components/home/HomeInfoSection";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { Spinner } from "../../../components/ui/Spinner";
import { ProductCard } from "../components/ProductCard";
import { useCategories, useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Container size="xl" py="xl">
        <FeaturedProducts />
        <CategoryCards />
        <HomeInfoSection />
      </Container>
    </>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.0" py={{ base: 48, md: 72 }}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" verticalSpacing="xl">
          <Stack justify="center" gap="md">
            <Badge w="fit-content" size="lg" variant="light">
              Fresh deals every day
            </Badge>
            <Title order={1} size="3rem">
              Discover products you will actually love
            </Title>
            <Text size="lg" c="dimmed">
              Shop featured picks, browse popular categories, and find your next
              favorite item in one place.
            </Text>
            <Group mt="md">
              <Button
                size="md"
                rightSection={<IconArrowRight size={18} />}
                onClick={() => navigate("/products")}
              >
                Shop Products
              </Button>
              <Button
                size="md"
                variant="outline"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </Button>
            </Group>
          </Stack>

          <Image
            radius="md"
            h={{ base: 260, md: 360 }}
            fit="cover"
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
            alt="Featured shopping products"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const FeaturedProducts = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) return <Spinner />;

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  const featuredProducts = products
    ?.filter((product: Product) => product.rating >= 4)
    .slice(0, 4);

  return (
    <Box mb="xl">
      <Group justify="space-between" mb="md">
        <Title order={2}>Featured Products</Title>
        <Button variant="subtle" component="a" href="#/products">
          View all
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {featuredProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const CategoryCards = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) return <Spinner />;

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Box mb="xl">
      <Title order={2} mb="md">
        Shop by Category
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        {categories?.slice(0, 8).map((category) => (
          <Card
            key={category}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products?category=${category}`)}
          >
            <Group justify="space-between">
              <Group>
                <IconCategory size={22} />
                <Text fw={600} tt="capitalize">
                  {category.replaceAll("-", " ")}
                </Text>
              </Group>
              <IconArrowRight size={18} />
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
