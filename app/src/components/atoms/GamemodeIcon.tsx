import React from 'react';
import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';
import Taiko from '@assets/icons/steve/taiko.svg';
import Mania from '@assets/icons/steve/taiko.svg';

export const GamemodeIcon: React.FC<{ gamemode: Gamemodes }> = ({
  gamemode,
  ...props
}) => {
  switch (gamemode) {
    case 'ctb':
      return CatchTheBeat(props);
    case 'mania':
      return Mania(props);
    case 'std':
      return Standard(props);
    case 'taiko':
    default:
      return Taiko(props);
  }
};
