import 'twin.macro';
import React from 'react';

import Search from '_assets/icons/outline/search.svg';

import SkeletonLoader from '_components/atoms/skeleton-loader';
import Input from '_components/atoms/input';
import JourneyCard from '_components/molecules/journey-card';

type QueueTemplateProps = {
  suggestions?: Pick<Journey, '_id' | 'title'>[];
  journeys?: Journey[];
};

const QueueTemplate: React.FC<QueueTemplateProps> = (props) => {
  return (
    <section tw="space-y-4">
      <section tw="space-y-4">
        <Input icon={<Search />} placeholder="Filter or something" />
        <ul tw="space-y-2">
          {props.journeys?.map((journey) => (
            <li key={journey._id}>
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
