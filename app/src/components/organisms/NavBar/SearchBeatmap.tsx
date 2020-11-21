import React, { useState } from "react";
import { useAsyncFn, useDebounce } from "react-use";
import "twin.macro";

import SearchIcon from "@assets/icons/outline/search.svg";
import api from "@api";

const Search: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [{ loading, value: beatmaps }, searchBeatmaps] = useAsyncFn(
    async (search: string) => {
      if (search) {
        return await api.searchBeatmap(search);
      }
      return [];
    },
    [],
    { loading: false, value: [] }
  );

  useDebounce(
    () => {
      searchBeatmaps(search);
    },
    500,
    [search]
  );

  return (
    <>
      <section tw="flex bg-white rounded shadow items-center">
        <section aria-hidden tw="p-2">
          <SearchIcon tw="h-5 w-5" />
        </section>
        <input
          type="text"
          tw="bg-transparent pl-2 pr-2 text-sm flex-grow h-8"
          placeholder="Author, Artist, Group..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>
      {loading && <section>Loading...</section>}
      {beatmaps?.map((beatmap) => (
        <section></section>
      ))}
    </>
  );
};

export default Search;
