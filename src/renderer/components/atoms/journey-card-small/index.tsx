import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'twin.macro';
import links from '@/services/links';
import { FocusRingFlatStyle } from '@/globals/styles/focus';
import { Definitions } from '@/services/api';

const JourneyCardSmall: React.FunctionComponent<
  Pick<
    Definitions['Journey'],
    'artist' | 'organizer' | 'title' | 'id' | 'thumbnail_url'
  >
> = (props) => {
  const link = useMemo(() => links.journeys.id({ id: props.id! }), [props.id]);

  return (
    <section tw="hover:bg-gray-200 rounded transition-colors duration-200 ease-in-out">
      <Link
        to={link}
        tw="flex flex-row items-center space-x-2 h-24 p-2 outline-none rounded focus:bg-gray-200"
        css={[FocusRingFlatStyle]}
      >
        <img src={props.thumbnail_url} tw="h-full rounded bg-gray-300" />
        <section tw="flex flex-col flex-grow h-full justify-around space-y-1 text-xs truncate">
          <span>{props.organizer?.name}</span>
          <strong>{props.title}</strong>
          <span>{props.artist}</span>
        </section>
      </Link>
    </section>
  );
};

export default JourneyCardSmall;
