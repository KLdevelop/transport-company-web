import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicleCategories } from 'src/models/thunks';

const initialState: VehicleCategory[] = [];

export const vehicleCategoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchVehicleCategories.fulfilled, (_state, action) => action.payload);
});
