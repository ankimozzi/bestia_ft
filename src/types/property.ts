interface Property {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  price: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export type { Property };