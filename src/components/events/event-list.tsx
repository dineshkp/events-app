import { useState, useEffect } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EventCard } from './event-card'
import { EventForm } from './event-form'
import { useEventStore } from '@/store/use-event-store'
import { EventFormValues } from '@/lib/validations/event'

export function EventList() {
    const [showForm, setShowForm] = useState(false)
    const {
        events,
        loading,
        selectedEvent,
        setSelectedEvent,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent
    } = useEventStore()

    useEffect(() => {
        fetchEvents().catch(error => console.error(error))
    }, [fetchEvents])

    const handleCreate = async (data: EventFormValues) => {
        try {
            createEvent(data)
            setShowForm(false)
        } catch (error) {
            console.error(error)
            // Error is handled by the store
        }
    }

    const handleUpdate = async (data: EventFormValues) => {
        if (selectedEvent) {
            try {
                updateEvent(selectedEvent.id, data)
                setSelectedEvent(null)
            } catch (error) {
                console.error(error)
                // Error is handled by the store
            }
        }
    }

    if (loading && events.length === 0) {
        return <div className="flex items-center justify-center h-96">Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Events</h2>
                <Button onClick={() => setShowForm(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Event
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onEdit={(event) => setSelectedEvent(event)}
                        onDelete={deleteEvent}
                    />
                ))}
            </div>

            <EventForm
                open={showForm || !!selectedEvent}
                onClose={() => {
                    setShowForm(false)
                    setSelectedEvent(null)
                }}
                onSubmit={selectedEvent ? handleUpdate : handleCreate}
                initialData={selectedEvent || undefined}
            />
        </div>
    )
}