import { useState } from "react";

interface Property {
  City: string;
}

interface FilterParams {
  minPrice: number | null;
  maxPrice: number | null;
  city: string;
}

interface SidebarProps {
  cities: string[];
  onFilter: (params: FilterParams) => void;
  className?: string;
}

const Sidebar = ({ cities, onFilter, className }: SidebarProps) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCity, setSelectedCity] = useState("");

  // Create unique cities list
  const uniqueCities = Array.from(new Set(cities)).sort();

  const handleFilter = () => {
    onFilter({
      minPrice: priceRange.min ? Number(priceRange.min) : null,
      maxPrice: priceRange.max ? Number(priceRange.max) : null,
      city: selectedCity,
    });
  };

  return (
    <div className={`w-64 p-4 bg-white shadow-lg ${className || ""}`}>
      <h2 className="text-xl font-bold mb-4">Property Filter</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Minimum Price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="w-full p-2 border rounded"
            aria-label="Minimum Price"
          />
          <div className="text-center">~</div>
          <input
            type="number"
            placeholder="Maximum Price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="w-full p-2 border rounded"
            aria-label="Maximum Price"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">City</h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="Select City"
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        aria-label="Apply Filter"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default Sidebar;
