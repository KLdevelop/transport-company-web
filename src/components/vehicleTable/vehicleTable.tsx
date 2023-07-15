import React, { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchVehicles } from 'src/models/thunks';
import { Modal, MenuItem, Select, SelectChangeEvent, TextField, Button, Box } from '@mui/material';
import { addVehicle, editVehicle } from 'src/models/thunks/vehicleThunks';

import styles from './vehicleTable.module.scss';

const modalStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  width: '500px',
  background: 'white',
  padding: '20px',
  margin: 'auto',
  display: 'grid',
  gap: '20px',
  flexDirection: 'column',
};

export const VehicleTable = () => {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector((state) => state.vehicles);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(0);

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
  const onReleaseYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNaN(+value)) setReleaseYear(value);
  };

  const [selectedHasTrailer, setSelectedHasTrailer] = useState('');
  const onSelectedHasTrailerChange = (e: SelectChangeEvent) =>
    setSelectedHasTrailer(e.target.value);

  const [stateNumber, setStateNumber] = useState('');
  const onStateNumberChange = (e: ChangeEvent<HTMLInputElement>) => setStateNumber(e.target.value);

  const [modalButton, setModalButton] = useState('Изменить');

  const openEditModal = (vehicle: Vehicle) => {
    setModalButton('Изменить');

    setSelectedVehicleId(vehicle.id);
    setBrand(vehicle.brand);
    setModel(vehicle.model);
    setSelectedCategory(vehicle.category);
    setStateNumber(vehicle.stateNumber);
    setSelectedVehicleType(vehicle.type);
    setReleaseYear('' + vehicle.releaseYear);
    setSelectedHasTrailer(vehicle.hasTrailer ? 'Да' : 'Нет');
    setIsOpenModal(true);
  };

  const onModalButtonClick = () => {
    const vehicle: Vehicle = {
      id: selectedVehicleId,
      brand,
      model,
      category: selectedCategory,
      stateNumber,
      type: selectedVehicleType,
      releaseYear: +releaseYear,
      hasTrailer: selectedHasTrailer === 'Да' ? true : false,
    };

    dispatch(modalButton === 'Изменить' ? editVehicle(vehicle) : addVehicle(vehicle));
    setIsOpenModal(false);
  };

  const openAddModal = () => {
    setModalButton('Добавить');

    setBrand('');
    setModel('');
    setSelectedCategory('');
    setStateNumber('');
    setSelectedVehicleType('');
    setReleaseYear('');
    setSelectedHasTrailer('');

    setIsOpenModal(true);
  };

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <>
      <div className={styles.vehicleTable}>
        <div className={styles.head}>
          <span>Марка</span>
          <span>Модель</span>
          <span>Категория</span>
          <span>Гос. номер</span>
          <span>Тип</span>
          <span>Год выпуска</span>
          <span>Есть прицеп</span>
          <span className={styles.addVehicle} onClick={openAddModal}>
            Добавить
          </span>
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
            <span className={styles.edit} onClick={() => openEditModal(vehicle)}>
              Редактировать
            </span>
          </div>
        ))}
      </div>
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)} sx={modalStyles}>
        <Box sx={modalContentStyles}>
          <TextField label="Марка" variant="outlined" onChange={onBrandChange} value={brand} />
          <TextField label="Модель" variant="outlined" onChange={onModelChange} value={model} />
          <Select value={selectedCategory} onChange={onSelectedCategoryChange} label="Категория">
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Гос. номер"
            variant="outlined"
            onChange={onStateNumberChange}
            value={stateNumber}
          />
          <Select value={selectedVehicleType} onChange={onSelectedVehicleTypeChange} label="Тип">
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
          <Select
            value={selectedHasTrailer}
            onChange={onSelectedHasTrailerChange}
            label="Есть прицеп"
          >
            <MenuItem value={'Да'}>Да</MenuItem>
            <MenuItem value={'Нет'}>Нет</MenuItem>
          </Select>
          <Button onClick={onModalButtonClick}>
            {modalButton === 'Изменить' ? 'Изменить' : 'Добавить'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
