// src/api/carapi.ts
import axios, { AxiosRequestConfig} from 'axios';
import { CarResponse, Car, CarEntry } from '../types';

const getConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt');
  return {
    headers: {
      Authorization: token || '',           // уже содержит "Bearer "
      'Content-Type': 'application/json'
    }
  };
};

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getConfig()
  );
  return response.data._embedded.cars;
};

export const deleteCar = async (link: string) => {
  await axios.delete(link, getConfig());
};

export const addCar = async (car: Car) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getConfig()
  );
  return response.data;
};

export const updateCar = async (carEntry: CarEntry) => {
  const response = await axios.put(
    carEntry.url,
    carEntry.car,
    getConfig()
  );
  return response.data;
};