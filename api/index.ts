// src/api.ts
import axios from 'axios';
import {Transport, ITransportBase} from "@/types";

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const fetchTransports = () => instance.get<Transport[]>('/transports');
export const createTransport = (data: ITransportBase) => instance.post<Transport>('/transports', data);
export const fetchTransport = (id: number) => instance.get<Transport>(`/transports/${id}`);
export const updateTransport = (id: number, data: ITransportBase) =>
  instance.patch<Transport>(`/transports/${id}`, data);
export const deleteTransport = (id: number) => instance.delete(`/transports/${id}`);
