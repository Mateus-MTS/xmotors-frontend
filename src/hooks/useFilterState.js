import { useState } from "react";

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

  function resetFilters() {
    setFilters({
      location: "",
      price: [0, 500000],
      km: [0, 200000],
      year: [2000, 2025],
      fuel: "",
      color: "",
      model: "",
    });
  }

  function updateFilter(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  return { filters, updateFilter, resetFilters };
}