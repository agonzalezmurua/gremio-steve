import React, { useState } from 'react';
import { useAsyncFn, useDebounce } from 'react-use';
import 'twin.macro';
import api from 'services/api';

import Search from '_assets/icons/outline/search.svg';
import Spinner from '_assets/icons/steve/spinner.svg';

import Input from '_components/atoms/input';
import JourneySmallCard from '_components/atoms/journey-card-small';

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
            <li tw="animate-fadein" key={beatmap._id}>
              <JourneySmallCard
                _id={beatmap._id}
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