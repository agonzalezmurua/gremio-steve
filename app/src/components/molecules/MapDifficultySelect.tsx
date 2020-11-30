import Select, {
  SelectProps,
  SelectOption,
} from '@components/atoms/form-controls/Select';
import React from 'react';

const options: Array<SelectOption> = [
  {
    label: 'normal',
    value: 'normal',
  },
  {},
];
Object.freeze(options);

const MapDifficultySelect: React.FC<Optional<SelectProps, 'options'>> = (
  props
) => {
  return <Select options={options} {...props} />;
};

export default MapDifficultySelect;
