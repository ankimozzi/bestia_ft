import { create } from "zustand";
import { Property } from "@/types/property";

interface PropertyStore {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property) => void;
  clearSelectedProperty: () => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  clearSelectedProperty: () => set({ selectedProperty: null }),
}));
