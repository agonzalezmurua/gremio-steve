import tw, { styled, TwStyle } from 'twin.macro';
import React from 'react';
import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';
import Taiko from '@assets/icons/steve/taiko.svg';
import Mania from '@assets/icons/steve/mania.svg';

type Props = {
  gamemode: Mode;
  difficulty?: Beatmap['difficulty'];
};

const colors: {
  [keys in Beatmap['difficulty']]: TwStyle;
} = {
  easy: tw`text-lime-500`,
  normal: tw`text-lightBlue-500`,
  hard: tw`text-yellow-500`,
  insane: tw`text-pink-500`,
  expert: tw`text-purple-500`,
  'expert+': tw`text-black`,
};

const ModeIcon: React.FC<Props> = ({ gamemode, ...props }) => {
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

ModeIcon.defaultProps = {
  difficulty: 'expert+',
};
export default styled(ModeIcon)<Props>`
  ${(props) => colors[props.difficulty!]}
`;
