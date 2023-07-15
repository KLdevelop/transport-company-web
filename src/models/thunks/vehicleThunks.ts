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

export const editVehicle = createAsyncThunk('vehicles/editVehicle', async (vehicle: Vehicle) => {
  const response = await axios.put<Vehicle>('/api/vehicles/edit', vehicle);

  if (response.status !== 200) throw response.statusText;

  return vehicle;
});

export const addVehicle = createAsyncThunk('vehicles/addVehicle', async (vehicle: Vehicle) => {
  const response = await axios.post('/api/vehicles/new', vehicle);

  if (response.status !== 200) throw response.statusText;

  return vehicle;
});
