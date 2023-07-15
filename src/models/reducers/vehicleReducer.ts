import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicles, filterVehicles } from '../thunks';

const initialState: Vehicle[] = [];

export const vehicleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchVehicles.fulfilled, (_state, action) => action.payload)
    .addCase(filterVehicles.fulfilled, (_state, action) => action.payload);
});
