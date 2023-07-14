import { configureStore } from '@reduxjs/toolkit';
import { vehicleReducer, vehicleCategoryReducer, vehicleTypeReducer } from './reducers';

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    vehicleCategories: vehicleCategoryReducer,
    vehicleTypes: vehicleTypeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
