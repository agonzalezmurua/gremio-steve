import React, { useState } from 'react';
import { useAsyncFn, useDebounce } from 'react-use';
import 'twin.macro';
import Api, { Definitions } from '_/services/api';

import Search from '_/assets/icons/outline/search.svg';
import Spinner from '_/assets/spinner.svg';

import Input from '_/components/atoms/input';
import JourneySmallCard from '_/components/atoms/journey-card-small';

const SearchJourney: React.FunctionComponent = () => {
  const [search, setSearch] = useState('');
  const [{ loading, value: journeys }, searchJourneys] = useAsyncFn(
    async (search: string): Promise<Array<Definitions['Journey']>> => {
      if (search) {
        const { data } = await Api.Operations.searchJourneys({
          query: { search },
        });
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
            <li tw="animate-fadein" key={beatmap.id}>
              <JourneySmallCard
                id={beatmap.id}
                artist={beatmap.artist}
                title={beatmap.title}
                organizer={beatmap.organizer}
                thumbnail_url={beatmap.thumbnail_url}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchJourney;
