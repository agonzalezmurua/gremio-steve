import GamemodeIcon from '@components/atoms/GamemodeIcon';
import React from 'react';
import 'twin.macro';

type Props = {
  gamemodes: Gamemodes[];
};

const GamemodeBadges: React.FC<Props> = (props) => {
  return (
    <section tw="inline-flex space-x-2 bg-gray-100 dark:(bg-gray-800 text-black) p-1 rounded-md">
      {props.gamemodes.map((mode) => (
        <GamemodeIcon gamemode={mode} key={mode} tw="h-6 w-6" />
      ))}
    </section>
  );
};

export default GamemodeBadges;
