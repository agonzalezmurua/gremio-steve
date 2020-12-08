import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Search from '@assets/icons/outline/search.svg';

import JourneySmallCard from '@components/atoms/JourneySmallCard';
import Skeleton from '@components/atoms/Skeleton';
import Input from '@components/atoms/form-controls/Input';

type QueueTemplateProps = {
  suggestions?: Pick<Journey, '__id' | 'title'>[];
  journeys?: Journey[];
};

const QueueTemplate: React.FC<QueueTemplateProps> = (props) => {
  return (
    <section tw="space-y-4">
      <FormattedMessage
        id="pages.user.queue"
        defaultMessage="Queue"
        description="Queue Page Header"
        tagName="h1"
      />
      <section tw="space-y-4">
        <Input icon={<Search />} />
        <ul tw="space-y-2">
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
      </section>
    </section>
  );
};

export default QueueTemplate;
