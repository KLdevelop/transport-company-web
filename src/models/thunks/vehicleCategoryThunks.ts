import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicleCategories = createAsyncThunk(
  'vehicleCategories/fetchVehicleCategories',
  async () => {
    const vehicleCategories = await axios.get<VehicleCategory[]>('/api/categories');

    return vehicleCategories.data;
  },
);
