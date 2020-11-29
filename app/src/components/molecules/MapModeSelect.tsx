import React from 'react';

import Taiko from '@assets/icons/steve/taiko.svg';
import Standard from '@assets/icons/steve/standard.svg';
import CatchTheBeat from '@assets/icons/steve/catch_the_beat.svg';

import Select, { SelectProps } from '@components/atoms/form-controls/Select';

const MapModeSelect: React.FC<Optional<SelectProps, 'options'>> = (props) => {
  return (
    <Select
      {...props}
      options={[
        { label: 'Catch the beat', value: 'ctb', icon: CatchTheBeat },
        { label: 'Taiko', value: 'taiko', icon: Taiko },
        { label: 'Standard', value: 'std', icon: Standard },
      ]}
    />
  );
};

export default MapModeSelect;
