import tw from 'twin.macro';
import React from 'react';
import { GamemodeMessages } from '@globals/constants/GenericMessages';
import { FormattedMessage } from 'react-intl';

import Standard from '@assets/icons/steve/standard.svg';
import Taiko from '@assets/icons/steve/taiko.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';

type Props = {
  selected: string;
  modes: Array<Gamemodes>;
  onClick: (string: Gamemodes) => void;
};

const Icon: React.FC<{ mode: Gamemodes }> = (props) => {
  switch (props.mode) {
    case 'std':
      return <Standard {...props} />;
    case 'taiko':
      return <Taiko {...props} />;
    case 'ctb':
    default:
      return <CatchTheBeat {...props} />;
  }
};

const Headers: React.FC<Props> = (props) => {
  return (
    <ul tw="flex font-bold">
      {props.modes.map((mode) => (
        <li
          tw="flex space-x-1 rounded-t-lg p-1 pr-2 items-center bg-gray-100 dark:(bg-gray-700)"
          css={[props.selected === mode && tw`bg-gray-200 dark:(bg-gray-800)`]}
          key={mode}
          onClick={() => props.onClick(mode)}
        >
          <Icon mode={mode} tw="h-8 w-8 text-black" />
          <span>
            <FormattedMessage
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ...GamemodeMessages[`generic.gamemodes.${mode}`]
              }
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Headers;
