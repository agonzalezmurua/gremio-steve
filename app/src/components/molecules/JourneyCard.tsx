import { css } from 'twin.macro';
import React from 'react';

import Bell from '@assets/icons/solid/bell.svg';
import Star from '@assets/icons/solid/star.svg';
import Button from '@components/atoms/form-controls/Button';
import GamemodeBadges from './GamemodeBadges';

type Props = {
  journey: Journey;
};

const JourneyCard: React.FC<Props> = (props) => (
  <section tw="rounded border">
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
      <section tw="text-sm border rounded-full text-center p-2 bg-white font-bold">
        {props.journey.status}
      </section>
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
      <span tw="font-bold text-lg">{props.journey.title}</span>
      <span tw="font-bold text-sm text-gray-700">{props.journey.artist}</span>
      <span tw="text-sm text-gray-700">{props.journey.organizer.name}</span>
      <section tw="flex">
        <GamemodeBadges gamemodes={props.journey.gamemodes} />
      </section>
    </section>
  </section>
);

export default JourneyCard;
