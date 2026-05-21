import { Container, Title } from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { SimpleGrid } from "@mantine/core";
import { ProductCard } from "../components/ProductCard";

const Products = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <Container size="xl" py="xl">
        <ErrorMessage message={error.message} />
      </Container>
    );
  }
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;
