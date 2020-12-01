import React, { useMemo } from 'react';
import {
  defineMessages,
  injectIntl,
  MessageDescriptor,
  WrappedComponentProps,
} from 'react-intl';

import Select, { SelectProps } from '@components/atoms/form-controls/Select';

type MapDifficultySelectProps = {
  mode?: DifficultyMap['mode'];
} & Optional<SelectProps, 'options'> &
  WrappedComponentProps;

const difficulties: Array<DifficultyMap['difficulty']> = [
  'easy',
  'normal',
  'hard',
  'insane',
  'expert',
  'expert+',
];

const messages = defineMessages({
  'std.easy': {
    description: 'Standard Easy diffculty name',
    defaultMessage: 'Easy',
  },
  'std.normal': {
    description: 'Standard Normal diffculty name',
    defaultMessage: 'Normal',
  },
  'std.hard': {
    description: 'Standard Hard difficulty name',
    defaultMessage: 'Hard',
  },
  'std.insane': {
    description: 'Standard Insane difficulty name',
    defaultMessage: 'Insane',
  },
  'std.expert': {
    description: 'Standard Expert difficulty name',
    defaultMessage: 'Expert',
  },
  'std.expert+': {
    description: 'Standard Expert Plus difficulty name',
    defaultMessage: 'Expert+',
  },
  std: {
    description: 'Standard option label',
    defaultMessage: 'Standard',
  },
});

const MapDifficultySelect: React.FC<MapDifficultySelectProps> = (props) => {
  const options = useMemo<SelectProps['options']>(() => {
    if (props.mode === undefined) {
      return [];
    }

    return difficulties.map((diff) => ({
      label: props.intl.formatMessage(messages[`${props.mode}.${diff}`]),
      value: diff,
    }));
  }, [props.lang]);
  return (
    <Select disabled={options.length === 0} options={options} {...props} />
  );
};

export default injectIntl(MapDifficultySelect);
