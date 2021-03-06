import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'twin.macro';
import links from '_/services/links';
import { FocusRingFlatStyle } from '_/globals/styles/focus';
import { Definitions } from '_/services/api';

const JourneyCardSmall: React.FunctionComponent<
  Pick<
    Definitions['Journey'],
    'artist' | 'organizer' | 'title' | 'id' | 'covers'
  >
> = (props) => {
  const link = useMemo(() => links.journeys.id({ id: props.id! }), [props.id]);

  return (
    <section tw="light:(hover:bg-gray-200) dark:(hover:bg-gray-900 active:bg-black) rounded transition-colors duration-200 ease-in-out">
      <Link
        to={link}
        tw="flex flex-row items-center space-x-2 h-24 p-2 outline-none rounded"
        css={[FocusRingFlatStyle]}
      >
        <img src={props.covers.thumbnail} tw="h-20 w-20 rounded bg-gray-300" />
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
