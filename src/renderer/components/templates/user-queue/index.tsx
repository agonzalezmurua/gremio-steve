import 'twin.macro';
import React from 'react';

import Search from '_/assets/icons/outline/search.svg';

import SkeletonLoader from '_/components/atoms/skeleton-loader';
import Input from '_/components/atoms/input';
import JourneyCard from '_/components/molecules/journey-card';
import { components } from 'common/typings/api.gremio-steve';

type Props = {
  suggestions?: Pick<components['schemas']['JourneyData'], 'id' | 'title'>[];
  journeys?: Array<components['schemas']['JourneyData']>;
};

const QueueTemplate: React.FC<Props> = (props) => {
  return (
    <section tw="space-y-4">
      <section tw="space-y-4">
        <Input icon={<Search />} placeholder="Filter or something" />
        <ul tw="space-y-2">
          {props.journeys?.map((journey) => (
            <li key={journey.id}>
              <JourneyCard journey={journey} />
            </li>
          )) || (
            <>
              <SkeletonLoader tw="w-full h-48" />
              <SkeletonLoader tw="w-full h-48" />
            </>
          )}
        </ul>
      </section>
    </section>
  );
};

export default QueueTemplate;
