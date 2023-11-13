import { Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log(searchTerm,"sökordet")
  };

  return (
    <div className="items-center flex flex-row p-2 gap-x-1 lg:flex">
      <div className="relative flex w-full gap-2 md:w-max">
        <FontAwesomeIcon icon={faSearch} />
        <Input
          type="search"
          placeholder="Search"
          containerProps={{
            className: "min-w-[180px]",
          }}
          className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button size="sm" className="rounded-lg text-slate-950" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
