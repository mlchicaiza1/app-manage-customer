
import { Client } from '../interfaces/Client';
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1/api/client';

export const getClients = async (): Promise<Client[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createClient = async (Client: Client): Promise<Client> => {
  const response = await axios.post(API_URL, Client);
  return response.data;
};

export const updateClient = async (id: number, Client: Client): Promise<Client> => {
  const response = await axios.put(`${API_URL}/${id}`, Client);
  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
