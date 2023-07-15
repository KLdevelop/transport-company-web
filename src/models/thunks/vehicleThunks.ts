import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  const vehicles = await axios.get<Vehicle[]>('/api/vehicles');

  return vehicles.data;
});

export const filterVehicles = createAsyncThunk(
  'vehicles/filterVehicles',
  async (filter: VehicleFilter) => {
    const vehicles = await axios.post<Vehicle[]>('/api/vehicles/filter', filter);

    return vehicles.data;
  },
);
