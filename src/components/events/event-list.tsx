import { useState } from 'react'
import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { EventCard } from './event-card'
import { EventForm } from './event-form'
import { useEventStore } from '@/store/use-event-store'
import { EventFormValues } from '@/lib/validations/event'

export function EventList() {
    const [showForm, setShowForm] = useState(false)
    const { events, selectedEvent, setSelectedEvent, createEvent, updateEvent, deleteEvent } = useEventStore()

    const handleCreate = (data: EventFormValues) => {
        createEvent(data)
        setShowForm(false)
    }

    const handleUpdate = (data: EventFormValues) => {
        if (selectedEvent) {
            updateEvent(selectedEvent.id, data)
            setSelectedEvent(null)
        }
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