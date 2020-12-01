import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Select, { SelectProps } from '@components/atoms/form-controls/Select';
import MapModeSelectMessages from './GameMapDifficultySelect.messages';

type MapDifficultySelectProps = {
  mode?: GameMap['mode'];
} & Optional<SelectProps, 'options'> &
  WrappedComponentProps;

const difficulties: Array<GameMap['difficulty']> = [
  'easy',
  'normal',
  'hard',
  'insane',
  'expert',
  'expert+',
];

const MapDifficultySelect: React.FC<MapDifficultySelectProps> = (props) => {
  const options = useMemo<SelectProps['options']>(() => {
    if (props.mode === undefined) {
      return [];
    }

    return difficulties.map((diff) => ({
      label: props.intl.formatMessage(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MapModeSelectMessages[`${props.mode}.${diff}`]
      ),
      value: diff,
    }));
  }, [props.lang]);
  return (
    <Select disabled={options.length === 0} options={options} {...props} />
  );
};

export default injectIntl(MapDifficultySelect);
