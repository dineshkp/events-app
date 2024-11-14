import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().min(1, "Date is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().optional(),
})

export type EventFormValues = z.infer<typeof eventFormSchema>