import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Select, { SelectProps } from '_components/atoms/select';
import { DIFFICULTIES } from '_constants/beatmapset';

import Messages from './messages';

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
        Messages[`${props.mode}.${diff}`]
      ),
      value: diff,
    }));
  }, [props.lang, props.mode]);
  return (
    <Select disabled={options.length === 0} options={options} {...props} />
  );
};

export default injectIntl(MapDifficultySelect);