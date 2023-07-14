import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicleTypes } from '../thunks';

const initialState: VehicleType[] = [];

export const vehicleTypeReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchVehicleTypes.fulfilled, (_state, action) => action.payload);
});
