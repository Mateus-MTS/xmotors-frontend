import { useState, useCallback } from "react";

export default function useFilterState() {
  const [filters, setFilters] = useState({
    location: "",
    price: [0, 500000],
    km: [0, 200000],
    year: [2000, 2025],
    fuel: "",
    color: "",
    model: "",
  });

  const resetFilters = useCallback(() => {
    setFilters({
      location: "",
      price: [0, 500000],
      km: [0, 200000],
      year: [2000, 2025],
      fuel: "",
      color: "",
      model: "",
    });
  }, []);

  const updateFilter = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { filters, updateFilter, resetFilters };
}