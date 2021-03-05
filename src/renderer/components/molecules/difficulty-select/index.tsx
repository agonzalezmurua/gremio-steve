import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Select, { SelectProps } from '_/components/atoms/select';
import { DIFFICULTIES } from '_/constants/beatmapset';
import { Definitions } from '_/services/api';

import Messages from './messages';

type Props = {
  mode?: Definitions['Journey.Beatmap']['mode'];
} & Optional<SelectProps, 'options'> &
  WrappedComponentProps;

const DifficultySelect: React.FC<Props> = (props) => {
  const options = useMemo<SelectProps['options']>(() => {
    if (props.mode === undefined) {
      return [];
    }
    return Object.values(DIFFICULTIES).map((diff) => ({
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

export default injectIntl(DifficultySelect);
