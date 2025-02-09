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
  properties: Property[];
  onFilter: (params: FilterParams) => void;
}

const Sidebar = ({ properties, onFilter }: SidebarProps) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCity, setSelectedCity] = useState("");

  // 고유한 도시 목록 생성
  const cities = [...new Set(properties.map((p) => p.City))].sort();

  const handleFilter = () => {
    onFilter({
      minPrice: priceRange.min ? Number(priceRange.min) : null,
      maxPrice: priceRange.max ? Number(priceRange.max) : null,
      city: selectedCity,
    });
  };

  return (
    <div className="w-64 p-4 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">부동산 필터</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">가격 범위</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="최소 가격"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="w-full p-2 border rounded"
            aria-label="최소 가격"
          />
          <div className="text-center">~</div>
          <input
            type="number"
            placeholder="최대 가격"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="w-full p-2 border rounded"
            aria-label="최대 가격"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">도시</h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="도시 선택"
        >
          <option value="">모든 도시</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        aria-label="필터 적용"
      >
        필터 적용
      </button>
    </div>
  );
};

export default Sidebar;
