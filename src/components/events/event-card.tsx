import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { Calendar, MapPin, Pencil, Trash } from "lucide-react";

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(event)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(event.id)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
            {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}
          </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                </div>
                {event.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                        {event.description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}