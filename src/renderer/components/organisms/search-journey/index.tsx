import React, { useState } from 'react';
import 'twin.macro';
import { Definitions } from '_/services/api';

import Search from '_/assets/icons/outline/search.svg';
import Spinner from '_/assets/spinner.svg';

import Input from '_/components/atoms/input';
import JourneySmallCard from '_/components/atoms/journey-card-small';
import SearchComponent from '_/components/molecules/search';

const SearchJourney: React.FC = () => {
  const [journeys, setJourneys] = useState<Array<Definitions['Journey']>>();

  return (
    <>
      <SearchComponent
        initialParameters={{ query: { search: '' } }}
        onResolved={({ response }) => {
          setJourneys(response.data);
        }}
        skipCondition={(params) => ({
          shouldSkip: params.query.search === '',
          returnValue: [],
        })}
        operation="searchJourneys"
        searchOnLoad={true}
        parameters={(query) => ({
          query: {
            search: query.search,
          },
        })}
      >
        {({ handleChange, isSearching }) => (
          <>
            <Input
              aria-label="Search for journey"
              name="search"
              icon={
                isSearching === true ? (
                  <Spinner tw="animate-spin" />
                ) : (
                  <Search />
                )
              }
              type="text"
              placeholder="Author, Artist, Group..."
              onChange={handleChange}
            />
          </>
        )}
      </SearchComponent>
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
