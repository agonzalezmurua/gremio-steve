import { css } from 'twin.macro';
import { Link } from 'react-router-dom';
import React from 'react';

import Bell from '@assets/icons/solid/bell.svg';
import Star from '@assets/icons/solid/star.svg';

import Button from '@components/atoms/button';
import JourneyStatusBadge from '@components/atoms/journey-status-badge';
import links from '@links';

import ModeBadges from '../mode-badges';

type Props = {
  journey: Journey;
  showStatus?: boolean;
};

const JourneyCard: React.FC<Props> = (props) => {
  return (
    <section tw="rounded border overflow-hidden dark:(border-gray-700 bg-gray-900)">
      <section
        tw="flex justify-between items-center p-2 bg-gray-500"
        css={[
          css`
            background-image: url(${props.journey.banner.url});
            background-position: 50%;
            background-size: cover;
          `,
        ]}
      >
        {(props.showStatus && (
          <JourneyStatusBadge status={props.journey.status} />
        )) ||
          null}
        <section tw="space-x-1">
          <Button size="self-contained" tw="p-1">
            <Bell tw="w-5 h-5" />
          </Button>
          <Button size="self-contained" tw="p-1">
            <Star tw="w-5 h-5" />
          </Button>
        </section>
      </section>
      <section tw="flex flex-col space-y-1 justify-between p-4">
        <Link
          to={links.journeys.id({ id: props.journey._id })}
          tw="font-bold text-lg dark:text-white"
        >
          {props.journey.title}
        </Link>
        <span tw="font-bold text-sm text-gray-700 dark:text-gray-300">
          {props.journey.artist}
        </span>
        <Link
          to={links.user.profile({ id: props.journey.organizer._id })}
          tw="text-sm text-gray-700 dark:text-gray-300"
        >
          {props.journey.organizer.name}
        </Link>
        <section tw="flex">
          <ModeBadges modes={props.journey.modes} />
        </section>
      </section>
    </section>
  );
};

JourneyCard.defaultProps = {
  showStatus: true,
};

export default JourneyCard;
