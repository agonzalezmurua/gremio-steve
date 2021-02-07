import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'twin.macro';
import links from '_links';
import { FocusRingFlatStyle } from '_globals/styles/focus';

const BeatmapResultCard: React.FunctionComponent<
  Pick<Journey, 'artist' | 'organizer' | 'title' | '_id' | 'thumbnail'>
> = (props) => {
  const link = useMemo(() => links.journeys.id({ id: props._id }), [props._id]);

  return (
    <section tw="hover:bg-gray-200 rounded transition-colors duration-200 ease-in-out">
      <Link
        to={link}
        tw="flex flex-row items-center space-x-2 h-24 p-2 outline-none rounded focus:bg-gray-200"
        css={[FocusRingFlatStyle]}
      >
        <img src={props.thumbnail.url} tw="h-full rounded bg-gray-300" />
        <section tw="flex flex-col flex-grow h-full justify-around space-y-1 text-xs truncate">
          <span>{props.organizer.name}</span>
          <strong>{props.title}</strong>
          <span>{props.artist}</span>
        </section>
      </Link>
    </section>
  );
};

export default BeatmapResultCard;
