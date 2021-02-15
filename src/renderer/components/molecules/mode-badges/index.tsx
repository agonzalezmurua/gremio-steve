import ModeIcon from '@/components/atoms/mode-icon';
import { Definitions } from '@/services/api';
import React from 'react';
import 'twin.macro';

type Props = {
  modes: Array<Definitions['Journey.Beatmap']['mode']>;
};

const ModeBadges: React.FC<Props> = (props) => {
  return (
    <section tw="inline-flex space-x-2 bg-gray-100 dark:(bg-gray-800 text-black) p-1 rounded-md">
      {props.modes.map((mode) => (
        <ModeIcon gamemode={mode} key={mode} tw="h-6 w-6" />
      ))}
    </section>
  );
};

export default ModeBadges;
