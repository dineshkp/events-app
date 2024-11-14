export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export type CreateEventInput = Omit<Event, 'id'>;
export type UpdateEventInput = Partial<CreateEventInput>;