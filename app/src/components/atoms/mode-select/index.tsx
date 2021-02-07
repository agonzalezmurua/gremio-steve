import React, { useMemo } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Taiko from '_assets/icons/steve/taiko.svg';
import Standard from '_assets/icons/steve/standard.svg';
import CatchTheBeat from '_assets/icons/steve/catch_the_beat.svg';
import Select, { SelectProps } from '_components/atoms/select';

import Messages from './messages';

const MapModeSelect: React.FC<
  Optional<SelectProps, 'options'> & WrappedComponentProps
> = ({ intl, lang, ...props }) => {
  const options = useMemo(
    () => [
      {
        label: intl.formatMessage(Messages.ctb),
        value: 'ctb',
        icon: CatchTheBeat,
      },
      {
        label: intl.formatMessage(Messages.taiko),
        value: 'taiko',
        icon: Taiko,
      },
      {
        label: intl.formatMessage(Messages.std),
        value: 'std',
        icon: Standard,
      },
    ],
    [lang]
  );

  return <Select {...props} options={options} />;
};

export default injectIntl(MapModeSelect);
