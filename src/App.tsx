import {ToasterProvider} from "@/components/providers/toaster-provider";
import {EventList} from "@/components/events/event-list";

function App() {

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-8">Events Manager</h1>
                <EventList />
            </div>
            <ToasterProvider />
        </>
    )
}

export default App
