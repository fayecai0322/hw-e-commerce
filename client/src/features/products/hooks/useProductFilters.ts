import { useSearchParams } from "react-router-dom";

export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  onSale: boolean;
  sort: string;
}
const DEFAULT_FILTERS: ProductFilters = {
  category: "",
  minPrice: 0,
  maxPrice: 2000,
  rating: 0,
  onSale: false,
  sort: "",
};

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilters = {
    category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
    minPrice: Number(searchParams.get("minPrice") ?? DEFAULT_FILTERS.minPrice),
    maxPrice: Number(searchParams.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice),
    rating: Number(searchParams.get("rating") ?? DEFAULT_FILTERS.rating),
    onSale: searchParams.get("onSale") === "true",
    sort: searchParams.get("sort") ?? DEFAULT_FILTERS.sort,
  };

  const setFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "" || value === false || value === DEFAULT_FILTERS[key]) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, String(value));
    }
    setSearchParams(nextParams);
  };
  
  const setFilters = (values: Partial<ProductFilters>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      const filterKey = key as keyof ProductFilters;

      if (
        value === "" ||
        value === false ||
        value === DEFAULT_FILTERS[filterKey]
      ) {
        nextParams.delete(filterKey);
      } else {
        nextParams.set(filterKey, String(value));
      }
    });

    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };
  return {
    filters,
    setFilter,
    setFilters,
    clearFilters,
  };
};

// 因为 useProductFilters 是一个 hook，如果不 return，这个 filters 只存在于 useProductFilters 函数内部，外面的组件拿不到。
