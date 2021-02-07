import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Select, { SelectProps } from '_components/atoms/select';
import MapModeSelectMessages from './messages';

import { DIFFICULTIES } from 'constants/GameMap';

type MapDifficultySelectProps = {
  mode?: Beatmap['mode'];
} & Optional<SelectProps, 'options'> &
  WrappedComponentProps;

const MapDifficultySelect: React.FC<MapDifficultySelectProps> = (props) => {
  const options = useMemo<SelectProps['options']>(() => {
    if (props.mode === undefined) {
      return [];
    }

    return DIFFICULTIES.map((diff) => ({
      label: props.intl.formatMessage(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MapModeSelectMessages[`${props.mode}.${diff}`]
      ),
      value: diff,
    }));
  }, [props.lang, props.mode]);
  return (
    <Select disabled={options.length === 0} options={options} {...props} />
  );
};

export default injectIntl(MapDifficultySelect);
