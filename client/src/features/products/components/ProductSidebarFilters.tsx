import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  RangeSlider,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useProductFilters } from "../hooks/useProductFilters";
import { useCategories } from "../hooks/useProducts";

const RATINGS = [4, 3, 2, 1];

export const ProductSidebarFilters = () => {
  const { filters, setFilter, setFilters, clearFilters } = useProductFilters();
  const { data: categories } = useCategories();

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...(categories ?? []).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  return (
    <Stack gap="md">
      <Box p="md" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <Stack gap="xl">
          <Group justify="space-between">
            <Title order={3}>Filters</Title>
            <Button variant="subtle" size="xs" onClick={clearFilters}>
              Clear
            </Button>
          </Group>

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Category
            </Text>
            <Select
              data={categoryOptions}
              value={filters.category}
              onChange={(value) => setFilter("category", value ?? "")}
              placeholder="All Categories"
              searchable
              clearable
            />
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Sort By
            </Text>
            <Select
              data={[
                { value: "", label: "Default" },
                { value: "price-asc", label: "Price: Low to High" },
                { value: "price-desc", label: "Price: High to Low" },
                { value: "rating-desc", label: "Rating: High to Low" },
                { value: "name-asc", label: "Name: A to Z" },
              ]}
              value={filters.sort}
              onChange={(value) => setFilter("sort", value ?? "")}
              clearable
            />
          </Stack>

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Price Range
            </Text>
            <RangeSlider
              min={0}
              max={2000}
              step={50}
              value={[filters.minPrice, filters.maxPrice]}
              onChange={([minPrice, maxPrice]) => {
                setFilters({ minPrice, maxPrice });
              }}
              marks={[
                { value: 0, label: "$0" },
                { value: 2000, label: "$2000" },
              ]}
              mb="md"
            />
            <Group grow>
              <NumberInput
                label="Min"
                value={filters.minPrice}
                min={0}
                max={filters.maxPrice}
                prefix="$"
                onChange={(value) =>
                  setFilter("minPrice", typeof value === "number" ? value : 0)
                }
              />
              <NumberInput
                label="Max"
                value={filters.maxPrice}
                min={filters.minPrice}
                max={2000}
                prefix="$"
                onChange={(value) =>
                  setFilter(
                    "maxPrice",
                    typeof value === "number" ? value : 2000,
                  )
                }
              />
            </Group>
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Rating
            </Text>
            <Stack gap="xs">
              {RATINGS.map((rating) => (
                <Group key={rating} gap="xs">
                  <Checkbox
                    checked={filters.rating === rating}
                    onChange={(event) =>
                      setFilter(
                        "rating",
                        event.currentTarget.checked ? rating : 0,
                      )
                    }
                  />
                  <Group gap={2}>
                    {[...Array(rating)].map((_, i) => (
                      <IconStarFilled key={i} size={16} color="#ffd43b" />
                    ))}
                    {[...Array(5 - rating)].map((_, i) => (
                      <IconStar key={i} size={16} color="#868e96" />
                    ))}
                  </Group>
                  <Text size="sm">& up</Text>
                </Group>
              ))}
            </Stack>
            <Divider />
          </Stack>

          <Divider />

          <Stack gap="sm">
            <Text fw={600} size="sm">
              Deals
            </Text>
            <Switch
              label="On Sale / Discounted"
              checked={filters.onSale}
              onChange={(event) =>
                setFilter("onSale", event.currentTarget.checked)
              }
            />
          </Stack>
        </Stack>
      </Box>
    </Stack>
    
  );
};
