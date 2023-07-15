import React, { ChangeEvent, useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchVehicleCategories, fetchVehicleTypes, filterVehicles } from 'src/models/thunks';
import styles from './filterBlock.module.scss';

export const FilterBlock = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.vehicleCategories);
  const vehicleTypes = useAppSelector((state) => state.vehicleTypes);

  const [selectedCategory, setSelectedCategory] = useState('');
  const onSelectedCategoryChange = (e: SelectChangeEvent) => setSelectedCategory(e.target.value);

  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const onSelectedVehicleTypeChange = (e: SelectChangeEvent) =>
    setSelectedVehicleType(e.target.value);

  const [brand, setBrand] = useState('');
  const onBrandChange = (e: ChangeEvent<HTMLInputElement>) => setBrand(e.target.value);

  const [model, setModel] = useState('');
  const onModelChange = (e: ChangeEvent<HTMLInputElement>) => setModel(e.target.value);

  const [releaseYear, setReleaseYear] = useState('');
  const onReleaseYearChange = (e: ChangeEvent<HTMLInputElement>) => setReleaseYear(e.target.value);

  const [selectedHasTrailer, setSelectedHasTrailer] = useState('');
  const onSelectedHasTrailerChange = (e: SelectChangeEvent) =>
    setSelectedHasTrailer(e.target.value);

  const onFilterClick = () => {
    const filter: VehicleFilter = {
      brand: brand !== '' ? brand : undefined,
      model: model !== '' ? model : undefined,
      category: selectedCategory !== '' ? selectedCategory : undefined,
      type: selectedVehicleType !== '' ? selectedVehicleType : undefined,
      releaseYear: releaseYear !== '' ? +releaseYear : undefined,
      hasTrailer:
        selectedHasTrailer !== '' ? (selectedHasTrailer === 'Да' ? true : false) : undefined,
    };

    dispatch(filterVehicles(filter));
  };

  useEffect(() => {
    dispatch(fetchVehicleCategories());
    dispatch(fetchVehicleTypes());
  }, [dispatch]);

  return (
    <div className={styles.filterBlock}>
      <TextField label="Марка" variant="outlined" onChange={onBrandChange} value={brand} />
      <TextField label="Модель" variant="outlined" onChange={onModelChange} value={model} />
      <Select value={selectedCategory} onChange={onSelectedCategoryChange}>
        <MenuItem value={''}>Не важно</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.categoryName}>
            {category.categoryName}
          </MenuItem>
        ))}
      </Select>
      <Select value={selectedVehicleType} onChange={onSelectedVehicleTypeChange}>
        <MenuItem value={''}>Не важно</MenuItem>
        {vehicleTypes.map((vehicleType) => (
          <MenuItem key={vehicleType.id} value={vehicleType.typeName}>
            {vehicleType.typeName}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Год выпуска"
        variant="outlined"
        onChange={onReleaseYearChange}
        value={releaseYear}
      />
      <Select value={selectedHasTrailer} onChange={onSelectedHasTrailerChange}>
        <MenuItem value={''}>Не важно</MenuItem>
        <MenuItem value={'Да'}>Да</MenuItem>
        <MenuItem value={'Нет'}>Нет</MenuItem>
      </Select>
      <Button variant="outlined" onClick={onFilterClick}>
        Фильтровать
      </Button>
    </div>
  );
};
