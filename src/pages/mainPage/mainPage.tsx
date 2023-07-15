import React from 'react';
import { FilterBlock, VehicleTable } from 'src/components';
import styles from './mainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <VehicleTable />
      <FilterBlock />
    </div>
  );
};
