import {create} from 'zustand'
import {toast} from 'sonner'
import {Event, CreateEventInput, UpdateEventInput} from '@/types/event'

interface EventStore {
    events: Event[]
    loading: boolean
    selectedEvent: Event | null

    // Actions
    setSelectedEvent: (event: Event | null) => void
    createEvent: (data: CreateEventInput) => void
    updateEvent: (id: string, data: UpdateEventInput) => void
    deleteEvent: (id: string) => void
}

export const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    loading: false,
    selectedEvent: null,

    setSelectedEvent: (event) => set({selectedEvent: event}),

    createEvent: (data) => {
        const events = get().events
        const newEvent: Event = {
            id: crypto.randomUUID(),
            ...data,
        }

        set({events: [...events, newEvent]})
        toast.success('Event created successfully')
    },

    updateEvent: (id, data) => {
        const events = get().events
        const updatedEvents = events.map((event) =>
            event.id === id ? {...event, ...data} : event
        )

        set({events: updatedEvents, selectedEvent: null})
        toast.success('Event updated successfully')
    },

    deleteEvent: (id) => {
        const events = get().events
        const previousEvents = [...events]

        set({events: events.filter((event) => event.id !== id)})

        toast.success('Event deleted', {
            action: {
                label: 'Undo',
                onClick: () => set({events: previousEvents})
            },
        })
    },
}))