import Select, { SelectProps } from '@components/atoms/form-controls/Select';
import React from 'react';

const MapDifficultySelect: React.FC<Optional<SelectProps, 'options'>> = (
  props
) => {
  return <Select options={[]} />;
};

export default MapDifficultySelect;
