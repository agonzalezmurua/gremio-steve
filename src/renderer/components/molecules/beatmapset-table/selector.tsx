import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Definitions } from '@/services/api';

import GamemodeMessages from '@/constants/messages/gamemodes';
import ModeIcon from '@/components/atoms/mode-icon';

import { ListItem } from './styles';

type Props = {
  selected: string;
  modes: Array<Definitions['Journey.Beatmap']['mode']>;
  onClick: (string: Definitions['Journey.Beatmap']['mode']) => void;
};

const Headers: React.FC<Props> = ({ selected, modes, onClick, ...props }) => {
  return (
    <ul tw="flex font-bold" {...props}>
      {modes.map((mode) => (
        <ListItem
          selected={selected === mode}
          key={mode}
          onClick={() => onClick(mode)}
        >
          <section tw="flex space-x-2 justify-center items-center">
            <ModeIcon gamemode={mode} tw="h-8 w-8 text-black" />
            <span>
              <FormattedMessage
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ...GamemodeMessages[`generic.gamemodes.${mode}`]
                }
              />
            </span>
          </section>
        </ListItem>
      ))}
    </ul>
  );
};

export default Headers;
