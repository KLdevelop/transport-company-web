import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicles } from '../thunks';

const initialState: Vehicle[] = [];

export const vehicleReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchVehicles.fulfilled, (_state, action) => action.payload);
});
