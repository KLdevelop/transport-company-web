interface Vehicle {
  id: number;
  brand: string;
  model: string;
  category: string;
  stateNumber: string;
  type: string;
  releaseYear: number;
  hasTrailer: boolean;
}

interface VehicleCategory {
  id: number;
  categoryName: string;
}

interface VehicleType {
  id: number;
  typeName: string;
}
