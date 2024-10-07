import { PurchaseOrder } from '../interfaces/PurchaseOrder';
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1/api/order';

export const getPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPurchaseOrderById = async (id: number): Promise<PurchaseOrder> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPurchaseOrder = async (PurchaseOrder: PurchaseOrder): Promise<PurchaseOrder> => {
  const response = await axios.post(API_URL, PurchaseOrder);
  return response.data;
};

export const updatePurchaseOrder = async (id: number, PurchaseOrder: PurchaseOrder): Promise<PurchaseOrder> => {
  const response = await axios.put(`${API_URL}/${id}`, PurchaseOrder);
  return response.data;
};

export const deletePurchaseOrder = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
