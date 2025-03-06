import { useSearchParams } from "react-router-dom";

export const CategoryCard = ({ category }) => {
  const { name, description, price, sheep } = category;
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = name === searchParams.get("category");
  return (
    <div
      onClick={() => setSearchParams({ category: name })}
      className={`relative flex p-2 bg-background-secondary flex-col rounded-md border border-border transition-all duration-300 cursor-pointer  shadow-black  ${
        selected
          ? "scale-105 drop-shadow-lg bg-background-secondary "
          : "bg-gradient-to-tl from-background-secondary to-background-primary hover:scale-105"
      } `}
    >
      <div className="mb-1 block font-sans text-xl font-semibold text-text-primary">
        {name}{" "}
        <span className="text-text-secondary text-sm">
          {" "}
          {description.slice(0, 10) + "..."}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className=" flex gap-3 items-center">
          <p className=" text-text-primary">{sheep}</p>
          <img
            src="images/sheep-96.png"
            className="w-5 filter dark:invert"
            alt="sheep image"
          />
        </div>
        <div className="">
          <p className="text-text-primary text-sm">{price} Dh/kg </p>{" "}
        </div>
      </div>
    </div>
  );
};
