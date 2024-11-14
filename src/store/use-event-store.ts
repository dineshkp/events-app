import {create} from 'zustand'
import {toast} from 'sonner'
import {Event, CreateEventInput, UpdateEventInput} from '@/types/event'
import { eventApi } from '@/lib/api/events'

interface EventStore {
    events: Event[]
    loading: boolean
    error: string | null
    selectedEvent: Event | null

    // Actions
    fetchEvents: () => Promise<void>
    setSelectedEvent: (event: Event | null) => void
    createEvent: (data: CreateEventInput) => void
    updateEvent: (id: string, data: UpdateEventInput) => void
    deleteEvent: (id: string) => void
}

export const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    loading: false,
    error: null,
    selectedEvent: null,

    setSelectedEvent: (event) => set({selectedEvent: event}),

    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const events = await eventApi.getAll();
            set({ events });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch events';
            set({ error: message });
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },

    createEvent: async (data) => {
        set({ loading: true, error: null });
        try {
            const newEvent = await eventApi.create(data);
            set((state) => ({ events: [newEvent, ...state.events] }));
            toast.success('Event created successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create event';
            set({ error: message });
            toast.error(message);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    updateEvent: async (id, data) => {
        set({ loading: true, error: null });
        try {
            await eventApi.update(id, data);
            set((state) => ({
                events: state.events.map((event) =>
                    event.id === id ? { ...event, ...data } : event
                ),
                selectedEvent: null,
            }));
            toast.success('Event updated successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update event';
            set({ error: message });
            toast.error(message);
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    deleteEvent: async (id) => {
        const previousEvents = get().events;

        // Optimistic update
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));

        try {
            await eventApi.delete(id);
            toast.success('Event deleted', {
                action: {
                    label: 'Undo',
                    onClick: async () => {
                        set({ events: previousEvents });
                        // You might want to implement restore endpoint in the backend
                    },
                },
            });
        } catch (error) {
            // Rollback on error
            set({ events: previousEvents });
            const message = error instanceof Error ? error.message : 'Failed to delete event';
            toast.error(message);
        }
    },
}))