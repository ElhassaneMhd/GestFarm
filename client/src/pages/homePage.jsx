import { Header } from "@/components/home/header";
import Hero from "@/components/home/Hero";
import { SheepList } from "@/features/SheepList";

export default function HomePage() {
  return (
    <div className=" w-full ">
      <Header />
      <Hero />
      <SheepList/>
    </div>
  );
}
