import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchVehicles } from 'src/models/thunks';

import styles from './vehicleTable.module.scss';

export const VehicleTable = () => {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className={styles.vehicleTable}>
      <div className={styles.head}>
        <span>Марка</span>
        <span>Модель</span>
        <span>Категория</span>
        <span>Гос. номер</span>
        <span>Тип</span>
        <span>Год выпуска</span>
        <span>Есть прицеп</span>
      </div>
      {vehicles.map((vehicle) => (
        <div className={styles.row} key={vehicle.id}>
          <span>{vehicle.brand}</span>
          <span>{vehicle.model}</span>
          <span>{vehicle.category}</span>
          <span>{vehicle.stateNumber}</span>
          <span>{vehicle.type}</span>
          <span>{vehicle.releaseYear}</span>
          <span>{vehicle.hasTrailer ? 'Да' : 'Нет'}</span>
        </div>
      ))}
    </div>
  );
};
