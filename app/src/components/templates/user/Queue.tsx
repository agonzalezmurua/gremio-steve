import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Search from '@assets/icons/outline/search.svg';

import Skeleton from '@components/atoms/Skeleton';
import Input from '@components/atoms/form-controls/Input';
import JourneyCard from '@components/molecules/JourneyCard';

type QueueTemplateProps = {
  suggestions?: Pick<Journey, '__id' | 'title'>[];
  journeys?: Journey[];
};

const QueueTemplate: React.FC<QueueTemplateProps> = (props) => {
  return (
    <section tw="space-y-4">
      <section tw="space-y-4">
        <Input icon={<Search />} placeholder="Filter or something" />
        <ul tw="space-y-2">
          {props.journeys?.map((journey) => (
            <li key={journey.__id}>
              <JourneyCard journey={journey} />
            </li>
          )) || (
            <>
              <Skeleton tw="w-full h-48" />
              <Skeleton tw="w-full h-48" />
            </>
          )}
        </ul>
      </section>
    </section>
  );
};

export default QueueTemplate;
