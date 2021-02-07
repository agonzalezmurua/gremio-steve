import 'twin.macro';
import React from 'react';
import { GamemodeMessages } from '@globals/constants/GenericMessages';
import { FormattedMessage } from 'react-intl';

import { ListItem } from './styles';
import ModeIcon from '@components/atoms/mode-icon';

type Props = {
  selected: string;
  modes: Array<Mode>;
  onClick: (string: Mode) => void;
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
