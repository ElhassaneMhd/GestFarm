import { Loader } from "lucide-react";
import { Status } from "../ui";
import { SheepCard } from "./SheepCard";
import { useAvailableSheep } from "@/features/sheep/useSheep";
import { useSearchParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Sheep as SheepIcon } from "../ui/Sheep";

export const Sheep = () => {
  const { sheep, isLoading, error } = useAvailableSheep();
  let sheepList = sheep;

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || null;
  if (category) sheepList = sheep?.filter((s) => s?.categoryName === category);

  return (
    <div className="relative p-2 pt-0">
      <div className="flex justify-between py-2 my-2 mb-4">
        <div className="flex items-center gap-2 text-2xl font-bold font-sans">
          sheep
          <SheepIcon size={"sm"} />
        </div>
      </div>
      {isLoading && <Loader size={40} className=" animate-spin m-auto mt-20" />}
      {error && !isLoading && (
        <Status
          heading={"No Sheep found"}
          message={"Sorry we dont have any available sheep "}
          status={"noResults"}
          className="top-32 "
        />
      )}

      <SheepList sheep={sheepList} isLoading={isLoading} error={error} />
    </div>
  );
};

function SheepList({ sheep, isLoading, error }) {
  const [parent] = useAutoAnimate();

  return (
    <div
      ref={parent}
      className="relative max-h-screen overflow-scroll grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 "
    >
      {sheep?.length == 0 && (
        <Status
          heading={"0 Available Sheep"}
          message={"Server error ,cannot show sheep "}
          status={"noResults"}
          size={"small"}
          className=" top-32"
        />
      )}
      {!isLoading &&
        !error &&
        sheep.map((sheep) => <SheepCard key={sheep.id} sheep={sheep} />)}
    </div>
  );
}
