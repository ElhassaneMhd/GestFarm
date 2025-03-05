import { Header } from "@/components/home/header";
import Hero from "@/components/home/Hero";
import SheepSection from "../components/home/SheepSection";

export function HomePage() {
  return (
    <div className=" w-full ">
      <Header />
      <Hero />
      <SheepSection />
    </div>
  );
}
