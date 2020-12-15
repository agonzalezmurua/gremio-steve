import React, { useState } from 'react';
import { useAsyncFn, useDebounce } from 'react-use';
import 'twin.macro';

import api from 'services/api';

import Search from '@assets/icons/outline/search.svg';
import Spinner from '@assets/icons/steve/spinner.svg';
import Input from '@components/atoms/form-controls/Input';
import JourneySmallCard from '@components/atoms/JourneySmallCard';

const SearchJourney: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const [{ loading, value: journeys }, searchJourneys] = useAsyncFn(
    async (search: string): Promise<Journey[]> => {
      if (search) {
        const { data } = await api.journeys.search(search);
        return data;
      }
      return journeys!;
    },
    [search],
    { loading: false, value: [] }
  );

  useDebounce(
    () => {
      searchJourneys(search);
    },
    500,
    [search]
  );

  return (
    <>
      <Input
        aria-label="Search for journey"
        name="journey-search"
        icon={loading ? <Spinner tw="animate-spin" /> : <Search />}
        type="text"
        disabled={loading}
        placeholder="Author, Artist, Group..."
        onChange={(event) => setSearch(event.target.value)}
      />
      {journeys && (
        <ul tw="space-y-2">
          {journeys.map((beatmap) => (
            <li tw="animate-fadein" key={beatmap.__id}>
              <JourneySmallCard
                __id={beatmap.__id}
                artist={beatmap.artist}
                title={beatmap.title}
                organizer={beatmap.organizer}
                thumbnail={beatmap.thumbnail}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchJourney;
