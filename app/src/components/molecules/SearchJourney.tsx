import React, { useState } from 'react';
import { useAsyncFn, useDebounce } from 'react-use';
import 'twin.macro';

import api from 'services/api';

import SearchIcon from '@assets/icons/outline/search.svg';
import Spinner from '@assets/icons/steve/spinner.svg';
import Input from '@components/atoms/form-controls/Input';
import BeatmapResultCard from '@components/atoms/JourneySearchResult';

const SearchBeatmap: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const [{ loading, value: beatmaps }, searchBeatmaps] = useAsyncFn(
    async (search: string): Promise<Journey[]> => {
      if (search) {
        const { data } = await api.journeys.search(search);
        return data;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return beatmaps!;
    },
    [search],
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
      <Input
        icon={
          loading ? (
            <Spinner tw="animate-spin w-5 h-5" />
          ) : (
            <SearchIcon tw="h-5 w-5" />
          )
        }
        type="text"
        disabled={loading}
        placeholder="Author, Artist, Group..."
        onChange={(event) => setSearch(event.target.value)}
      />
      {beatmaps && (
        <ul tw="space-y-2">
          {beatmaps.map((beatmap) => (
            <BeatmapResultCard
              key={beatmap.__id}
              __id={beatmap.__id}
              artist={beatmap.artist}
              title={beatmap.title}
              organizer={beatmap.organizer}
              lastUpdated={beatmap.lastUpdated}
              image={beatmap.image}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBeatmap;
