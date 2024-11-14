import {ToasterProvider} from "@/components/providers/toaster-provider";
import {EventList} from "@/components/events/event-list";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/app-sidebar";

function App() {

    return (
        <SidebarProvider defaultOpen>
            <div className="relative min-h-screen flex w-[inherit]">
                <AppSidebar />
                <main className="flex-1 w-full">
                    <div className="flex h-16 items-center border-b px-6">
                        <SidebarTrigger />
                    </div>
                    <div className="p-6">
                        <EventList />
                    </div>
                </main>
            </div>
            <ToasterProvider />
        </SidebarProvider>
    )
}

export default App
