import React, { useMemo } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';

import Taiko from '@assets/icons/steve/taiko.svg';
import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';

import Select, { SelectProps } from '@components/atoms/form-controls/Select';

const messages = defineMessages({
  ctb: {
    description: 'Catch the beat option label',
    defaultMessage: 'Catch the beat',
  },
  taiko: {
    description: 'Taiko option label',
    defaultMessage: 'Taiko',
  },
  std: {
    description: 'Standard option label',
    defaultMessage: 'Standard',
  },
});

const MapModeSelect: React.FC<
  Optional<SelectProps, 'options'> & WrappedComponentProps
> = ({ intl, lang, ...props }) => {
  const options = useMemo(
    () => [
      {
        label: intl.formatMessage(messages.ctb),
        value: 'ctb',
        icon: CatchTheBeat,
      },
      {
        label: intl.formatMessage(messages.taiko),
        value: 'taiko',
        icon: Taiko,
      },
      {
        label: intl.formatMessage(messages.std),
        value: 'std',
        icon: Standard,
      },
    ],
    [lang]
  );

  return <Select {...props} options={options} />;
};

export default injectIntl(MapModeSelect);
