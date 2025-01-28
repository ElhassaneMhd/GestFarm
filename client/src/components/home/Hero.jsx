import { useState } from "react";
import { Button, DropDown } from "../ui";
import {
  ChevronDown,
  Cloud,
  MapPin,
  Moon,
  Search as SearchIcon,
  Sun,
  Tractor,
  TreeDeciduous,
  TreePine,
  Trees,
} from "lucide-react";
import { Operations } from "../shared/Operations/Operations";
import { useOperations } from "../shared/Operations/useOperations";
import { Sheep } from "../ui/Sheep";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const [searchParams] = useSearchParams();

  return (
    <Operations>
      <div className="flex w-full   justify-center p-5 md:p-10 ">
        <div className=" relative overflow-hidden flex flex-col items-center justify-center bg-background-tertiary h-[60vh] w-full rounded-xl p-5 space-y-9">
          <div className=" text-xl text-center font-bold text-text-primary md:text-3xl z-20">
            Where Every
            <span className=" font-extrabold text-primary skew-y-12">
              {" "}
              Sheep{" "}
            </span>
            Matters <br />
            <p className=" text-lg text-text-tertiary">
              Quality You Can Count On!
            </p>
          </div>
          <Search query={searchParams.get("search")} />
          <Shapes />
        </div>
      </div>
    </Operations>
  );
}

function Search({ query }) {
  const [category, setCategory] = useState("Category");
  const [city, setCity] = useState("City");
  const [keyword, setKeyword] = useState(query || "");
  const { onFilter, onSearch } = useOperations();
  return (
    <div className="flex z-20 flex-col gap-3 rounded-xl bg-background-primary p-2 shadow-md sm:gap-5 sm:p-4 md:flex-row md:items-center md:self-center md:justify-center w-full mx-2 md:w-fit md:mx-auto">
      <FilterDropDown
        icon={<MapPin size={16} />}
        value={city}
        setValue={setCity}
        type="cities"
      />
      <FilterDropDown
        icon={<Sheep size={"xs"} />}
        value={category}
        setValue={setCategory}
        type="category"
      />

      <div className="flex items-center gap-2 p-3">
        <SearchIcon className=" text-text-tertiary" size={20} />
        <input
          type="search"
          className="w-full border-b border-border bg-transparent pb-1.5 text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary"
          placeholder="Your keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          disabled={category === "Category" && city === "City" && !keyword}
          onClick={() => {
            onSearch(keyword);
            onSearch(category);
            category !== "category" && onFilter("category", category);
            city !== "City" && onFilter("city", city);
            document
              .getElementById("sheep")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Search
        </Button>
        <Button
          color="tertiary"
          disabled={category === "Category" && city === "City" && !keyword}
          onClick={() => {
            setCategory("Category");
            setCity("City");
            setKeyword("");
            onSearch("");
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function FilterDropDown({ icon, value, setValue, type }) {
  const [parent] = useAutoAnimate({ duration: 300 });

  const { category, cities } = {
    category: ["sardi", "bniGuil", "bergui"],
    cities: ["tanger", "Sale", "Sidi Kacem"],
  };
  const [query, setQuery] = useState("");

  const results = { category, cities }[type]?.filter((e) =>
    e.toLowerCase().includes(query.toLowerCase())
  );

  const render = () => {
    if ({ sheep: false, cities: false }[type]) {
      return (
        <p className="mt-10 text-center font-medium text-text-tertiary">
          Loading...
        </p>
      );
    }
    if (!results?.length)
      return (
        <p className="mt-10 text-center font-medium text-text-tertiary">
          No results found
        </p>
      );
    return results?.map((e) => (
      <DropDown.Option
        key={e}
        onClick={() => setValue(e)}
        isCurrent={e === value}
      >
        {e}
      </DropDown.Option>
    ));
  };

  return (
    <div className="flex items-center gap-2 text-text-tertiary">
      <DropDown
        toggler={
          <Button display="with-icon" type="transparent">
            {icon}
            <span className="flex-1 text-start text-sm font-medium text-text-primary">
              {value}
            </span>
            <ChevronDown />
          </Button>
        }
        togglerClassName="w-full justify-between hover:bg-background-secondary"
        options={{
          className: "overflow-auto w-[230px] max-h-[250px] min-h-[150px]",
          shouldCloseOnClick: false,
          placement: "bottom",
        }}
      >
        <DropDown.SearchBar
          query={query}
          onChange={setQuery}
          placeholder="Search..."
        />
        <div ref={parent}>{render()}</div>
      </DropDown>
    </div>
  );
}

function Shapes() {
  const { theme } = useTheme();

  return (
    <>
      <Tractor
        size={100}
        className="absolute z-10 hidden md:block -bottom-3 left-80"
      />
      <TreeDeciduous
        size={120}
        className="absolute text-primary z-10 -bottom-3 left-0"
      />
      <Trees
        size={150}
        className="absolute hidden lg:block text-primary-hover z-10 -bottom-3 right-80"
      />
      <TreePine
        size={100}
        className="absolute text-primary z-10 -bottom-3 right-0"
      />

      <Cloud
        size={100}
        className="absolute hidden md:block z-10 top-0 -right-4"
      />
      <Cloud
        size={140}
        className="absolute hidden lg:block z-10 -top-10 right-48"
      />
      <Sun
        size={140}
        className={`absolute hidden md:block duration-200 transition-transform ${
          theme == "dark" ? " translate-y-96" : "-translate-y-40"
        } z-10 left-0`}
      />
      <Moon
        size={140}
        className={`absolute hidden md:block duration-200 transition-transform ${
          theme == "dark" ? "-translate-y-40" : " translate-y-96"
        }  z-10 left-0`}
      />
      <div className="absolute -top-9  w-full h-full bg-gradient-to-tl from-background-tertiary to-background-primary"></div>
      <div className="absolute backdrop-blur-sm z-10 -top-9  w-full h-full "></div>
    </>
  );
}
