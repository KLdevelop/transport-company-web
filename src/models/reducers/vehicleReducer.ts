import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicles, filterVehicles } from '../thunks';
import { addVehicle, editVehicle } from '../thunks/vehicleThunks';

const initialState: Vehicle[] = [];

export const vehicleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchVehicles.fulfilled, (_state, action) => action.payload)
    .addCase(filterVehicles.fulfilled, (_state, action) => action.payload)
    .addCase(editVehicle.fulfilled, (state, action) => {
      state[state.findIndex((vehicle) => vehicle.id === action.payload.id)] = action.payload;

      return state;
    })
    .addCase(editVehicle.rejected, () => alert('Не удалось отредактировать'))
    .addCase(addVehicle.fulfilled, (state, action) => {
      state.push(action.payload);

      return state;
    })
    .addCase(addVehicle.rejected, () => alert('Не удалось добавить'));
});
