import {ToasterProvider} from "@/components/providers/toaster-provider";
import {EventList} from "@/components/events/event-list";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/app-sidebar";

function App() {

    return (
        <SidebarProvider defaultOpen>
            <div className="relative flex min-h-screen">
                <AppSidebar/>
                <main className="flex-1">
                    <div className="flex h-16 items-center border-b px-6">
                        <SidebarTrigger/>
                    </div>
                    <div className="container py-6">
                        <EventList/>
                    </div>
                </main>
            </div>
            <ToasterProvider />
        </SidebarProvider>
    )
}

export default App
