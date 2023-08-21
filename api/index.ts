import axios from 'axios';
import {ITrack, ITrackBase, ITransport, ITransportBase} from "../types";

const instance = axios.create({
    baseURL: 'http://localhost:4000',
});

export const fetchTransports = (transportType?: string) => instance.get<ITransport[]>('/transports', {params: {type: transportType}});
export const createTransport = (data: ITransportBase) => instance.post<ITransport>('/transports', data);
export const fetchTransport = (id: number) => instance.get<ITransport>(`/transports/${id}`);
export const updateTransport = (id: number, data: ITransportBase) => instance.patch<ITransport>(`/transports/${id}`, data);
export const deleteTransport = (id: number) => instance.delete(`/transports/${id}`);


export const fetchTracks = () => instance.get<ITransport[]>('/tracks');
export const createTrack = (data: ITrackBase) => instance.post<ITransport>('/tracks', data);
export const fetchTrack = (id: number) => instance.get<ITransport>(`/tracks/${id}`);
export const updateTrack = (id: number, data: ITrack) => instance.patch<ITransport>(`/tracks/${id}`, data);
export const deleteTrack = (id: number) => instance.delete(`/tracks/${id}`);
