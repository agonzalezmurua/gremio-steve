import { css } from 'twin.macro';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';
import uniq from 'lodash/uniq';

import { components } from 'common/typings/api.gremio-steve';

import Bell from '_/assets/icons/solid/bell.svg';
import Star from '_/assets/icons/solid/star.svg';

import Button from '_/components/atoms/button';
import JourneyStatusBadge from '_/components/atoms/journey-status-badge';
import links from '_/services/links';

import ModeBadges from '../mode-badges';

type Props = {
  journey: components['schemas']['JourneyData'];
  showStatus?: boolean;
};

const JourneyCard: React.FC<Props> = (props) => {
  // const modes = useMemo(() => uniq(props.journey.beatmaps.map(({ mode }) => mode)), [props.journey]);

  return (
    <section tw="rounded border overflow-hidden dark:(border-gray-700 bg-gray-900)">
      <section
        tw="flex justify-between items-center p-2 bg-gray-500"
        css={[
          css`
            background-image: url(${props.journey.covers.banner});
            background-position: 50%;
            background-size: cover;
          `,
        ]}
      >
        {/* {(props.showStatus && <JourneyStatusBadge status={props.journey.status} />) || null} */}
        <section tw="space-x-1">
          <Button magnitude="self-contained" tw="p-1">
            <Bell tw="w-5 h-5" />
          </Button>
          <Button magnitude="self-contained" tw="p-1">
            <Star tw="w-5 h-5" />
          </Button>
        </section>
      </section>
      <section tw="flex flex-col space-y-1 justify-between p-4">
        <Link to={links.journeys.id({ id: props.journey.id })} tw="font-bold text-lg dark:text-white">
          {props.journey.title}
        </Link>
        <span tw="font-bold text-sm text-gray-700 dark:text-gray-300">{props.journey.artist}</span>
        {props.journey.organizer ? (
          <Link
            to={links.user.profile({ id: props.journey.organizer.id })}
            tw="text-sm text-gray-700 dark:text-gray-300"
          >
            {props.journey.organizer.name}
          </Link>
        ) : null}
        {/* <section tw="flex">
          <ModeBadges modes={modes} />
        </section> */}
      </section>
    </section>
  );
};

JourneyCard.defaultProps = {
  showStatus: true,
};

export default JourneyCard;
