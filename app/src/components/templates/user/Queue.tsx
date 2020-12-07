import React from 'react';
import 'twin.macro';
import JourneySmallCard from '@components/atoms/JourneySmallCard';
import Skeleton from '@components/atoms/Skeleton';

type QueueTemplateProps = {
  journeys?: Journey[];
};

const QueueTemplate: React.FC<QueueTemplateProps> = (props) => {
  return (
    <div>
      <ul tw="space-y-4">
        {props.journeys?.map((journey) => (
          <li key={journey.__id}>
            <JourneySmallCard
              __id={journey.__id}
              artist={journey.artist}
              organizer={journey.organizer}
              title={journey.title}
              thumbnail={journey.thumbnail}
            />
          </li>
        )) || (
          <>
            <Skeleton tw="w-full h-24" />
            <Skeleton tw="w-full h-24" />
            <Skeleton tw="w-full h-24" />
            <Skeleton tw="w-full h-24" />
          </>
        )}
      </ul>
    </div>
  );
};

export default QueueTemplate;
