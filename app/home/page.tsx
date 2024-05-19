import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavBar";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main
      className={
        "relative bg-black-100 flex justify-center items-center overflow-clip flex-col mx-auto sm:px-10 px-5"
      }
    >
      <div className={"mx-w-7xl w-full"}>
        <Hero />
        <FloatingNav navItems={navItems} />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
