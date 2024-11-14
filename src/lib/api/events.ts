import { apiClient } from './client';
import { CreateEventInput, Event, UpdateEventInput } from '@/types/event';

export const eventApi = {
    getAll: async () => {
        const response = await apiClient.get<Event[]>('/events');
        return response.data;
    },

    create: async (data: CreateEventInput) => {
        const response = await apiClient.post<Event>('/events', data);
        return response.data;
    },

    update: async (id: string, data: UpdateEventInput) => {
        const response = await apiClient.put<Event>(`/events/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`/events/${id}`);
    },
};