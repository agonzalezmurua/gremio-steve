import { css } from 'twin.macro';
import React, { useMemo } from 'react';

import Bell from '@assets/icons/solid/bell.svg';
import Star from '@assets/icons/solid/star.svg';
import Button from '@components/atoms/form-controls/Button';
import GamemodeBadges from './GamemodeBadges';
import { FormattedMessage } from 'react-intl';
import { JourneyMessages } from '@globals/constants/GenericMessages';
import { Link } from 'react-router-dom';
import links from '@links';

type Props = {
  journey: Journey;
  showStatus?: boolean;
};

const JourneyCard: React.FC<Props> = (props) => {
  const statusMessage = useMemo(() => {
    switch (props.journey.status) {
      case 'closed':
        return JourneyMessages['generic.journey.statusClosed'];
      case 'suspended':
        return JourneyMessages['generic.journey.statusSuspended'];
      default:
      case 'open':
        return JourneyMessages['generic.journey.statusOpen'];
    }
  }, [props.journey.status]);
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
          <section tw="text-sm border rounded-full text-center p-2 bg-white dark:text-black font-bold">
            <FormattedMessage {...statusMessage} />
          </section>
        )) || <section></section>}
        <section tw="space-x-1">
          <Button variant="self-contained" tw="p-1">
            <Bell tw="w-5 h-5" />
          </Button>
          <Button variant="self-contained" tw="p-1">
            <Star tw="w-5 h-5" />
          </Button>
        </section>
      </section>
      <section tw="flex flex-col space-y-1 justify-between p-4">
        <Link
          to={links.journeys.id({ id: props.journey.__id })}
          tw="font-bold text-lg dark:text-white"
        >
          {props.journey.title}
        </Link>
        <span tw="font-bold text-sm text-gray-700 dark:text-gray-300">
          {props.journey.artist}
        </span>
        <Link
          to={links.user.profile({ id: props.journey.organizer.__id })}
          tw="text-sm text-gray-700 dark:text-gray-300"
        >
          {props.journey.organizer.name}
        </Link>
        <section tw="flex">
          <GamemodeBadges gamemodes={props.journey.gamemodes} />
        </section>
      </section>
    </section>
  );
};

JourneyCard.defaultProps = {
  showStatus: true,
};

export default JourneyCard;
