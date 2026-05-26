import { Container, Grid, SimpleGrid, Title } from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types";
import { ProductSidebarFilters } from "../components/ProductSidebarFilters";
import { useMemo } from "react";
import { useProductFilters } from "../hooks/useProductFilters";

const Products = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const { filters } = useProductFilters();

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    const filtered = products.filter((product) => {
      const matchesCategory =
        !filters.category || product.category === filters.category;

      const matchesMinPrice = product.price >= filters.minPrice;
      const matchesMaxPrice = product.price <= filters.maxPrice;

      const matchesRating =
        filters.rating === 0 || product.rating >= filters.rating;

      const matchesOnSale = !filters.onSale || product.discountPercentage > 0;

      return (
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesOnSale
      );
    });

    return [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "name-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [products, filters]);
  if (isError) {
    return (
      <Container size="xl" py="xl">
        <ErrorMessage message={error.message} />
      </Container>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Our Products
      </Title>
      <Grid align="flex-start">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <ProductSidebarFilters />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
            {filteredProducts?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Products;
