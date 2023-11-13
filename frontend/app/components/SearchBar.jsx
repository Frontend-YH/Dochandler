"use client";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Search(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch("/api/docs");
      const posts = await res.json();
      const nonDeletedPost = posts.filter((post) => !post.isDeleted);
      setPosts(nonDeletedPost);
    };
    getPost();
  }, []);

  let searchResults;
  const searchFieldChange = (e) => {
    searchResults = posts.filter((post) => {
      return post.docTitle.toLowerCase().includes(e.target.value.toLowerCase());
    });

    props.setPosts(searchResults);
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
          onChange={searchFieldChange}
        />
      </div>
    </div>
  );
}
