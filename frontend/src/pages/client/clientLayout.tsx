import {Outlet} from "react-router";
import {Header} from "@/components/header.tsx";
import {Footer} from "@/components/footer.tsx";

export const ClientLayout = () => {
    return (
        <section className='flex flex-col h-full items-center justify-between'>
            <Header/>
            <main className="flex-1 w-full border flex items-center justify-center">
                <Outlet/>
            </main>
            <Footer/>
        </section>
    )
}