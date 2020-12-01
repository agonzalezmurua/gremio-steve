import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Taiko from '@assets/icons/steve/taiko.svg';
import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';

import Select, { SelectProps } from '@components/atoms/form-controls/Select';

import MapModeSelectMessages from './GameMapModeSelect.messages';

const MapModeSelect: React.FC<
  Optional<SelectProps, 'options'> & WrappedComponentProps
> = ({ intl, lang, ...props }) => {
  const options = useMemo(
    () => [
      {
        label: intl.formatMessage(MapModeSelectMessages.catch),
        value: 'catch',
        icon: CatchTheBeat,
      },
      {
        label: intl.formatMessage(MapModeSelectMessages.taiko),
        value: 'taiko',
        icon: Taiko,
      },
      {
        label: intl.formatMessage(MapModeSelectMessages.std),
        value: 'std',
        icon: Standard,
      },
    ],
    [lang]
  );

  return <Select {...props} options={options} />;
};

export default injectIntl(MapModeSelect);
