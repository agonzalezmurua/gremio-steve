import { GamemodeIcon } from '@components/atoms/GamemodeIcon';
import { title } from 'process';
import React from 'react';
import 'twin.macro';

type Props = {
  gamemodes: Gamemodes[];
};

const GamemodeBadges: React.FC<Props> = (props) => {
  return (
    <section tw="flex space-x-2 bg-gray-100 p-1 rounded-md">
      {props.gamemodes.map((mode) => (
        <GamemodeIcon gamemode={mode} key={mode} tw="h-6 w-6" />
      ))}
    </section>
  );
};

export default GamemodeBadges;
