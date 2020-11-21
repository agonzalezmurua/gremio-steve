import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'twin.macro';

const BeatmapResultCard: React.FunctionComponent<
  Pick<Journey, 'artist' | 'owner' | 'title' | '__id' | 'lastUpdated' | 'image'>
> = (props) => {
  const link = useMemo(() => `/journeys/${props.__id}`, [props.__id]);

  return (
    <li tw="hover:bg-gray-300 rounded">
      <Link to={link} tw="flex flex-row items-center space-x-2 h-24 p-2">
        <img src={props.image.url} tw="h-full rounded bg-gray-300" />
        <section tw="flex flex-col flex-grow h-full justify-around space-y-1 text-xs truncate">
          <span>{props.owner.name}</span>
          <strong>{props.title}</strong>
          <span>{props.artist}</span>
        </section>
      </Link>
    </li>
  );
};

export default BeatmapResultCard;