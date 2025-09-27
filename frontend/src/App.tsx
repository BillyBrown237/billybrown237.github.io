import './App.css'
import {About} from "@/pages/client/about.tsx";
import {Hero} from "@/pages/client/hero.tsx";
import {Skills} from "@/pages/client/skills.tsx";
import {Experiences} from "@/pages/client/experiences.tsx";
import {Work} from "@/pages/client/work.tsx";
import {Testimonials} from "@/pages/client/testimonials.tsx";
import {Contact} from "@/pages/client/contact.tsx";

function App() {


    return (
        <div>
            <Hero/>
            <About/>
            <Skills/>
            <Experiences/>
            <Work/>
            <Testimonials />
            <Contact />
        </div>
    )
}

export default App
