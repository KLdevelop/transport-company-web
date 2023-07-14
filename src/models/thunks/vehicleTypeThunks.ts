import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicleTypes = createAsyncThunk('vehicleTypes/fetchVehicleTypes', async () => {
  const vehicleTypes = await axios.get<VehicleType[]>('/api/types');

  return vehicleTypes.data;
});
