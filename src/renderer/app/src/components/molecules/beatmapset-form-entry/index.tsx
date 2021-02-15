import 'twin.macro';
import React, { useMemo } from 'react';
import { useField } from 'formik';

import Input from '_components/atoms/input';
import Label from '_components/atoms/label';
import DifficultySelect from '_components/molecules/difficulty-select';
import ModeSelect from '_components/molecules/mode-select';
import Button from '_components/atoms/button';

import Trash from '_assets/icons/outline/trash.svg';

type Props = {
  index: number;
  onDelete?: () => void;
};

const GameMapFormEntry: React.FC<Props> = ({ onDelete, index }) => {
  const names = useMemo(
    () => ({
      name: `maps[${index}].name`,
      mode: `maps[${index}].mode`,
      difficulty: `maps[${index}].difficulty`,
    }),
    [index]
  );
  const [name, nameMeta] = useField({
    name: names.name,
    type: 'text',
  });
  const [mode] = useField({ name: names.mode });
  const [difficulty] = useField({ name: names.difficulty });

  return (
    <React.Fragment>
      <Button size="self-contained" tw="h-8 p-2" color="red" onClick={onDelete}>
        <Trash tw="h-4 w-4" />
      </Button>

      <Label tw="flex-grow" text="Name" htmlFor={`maps[${index}].name`}>
        <Input {...name} error={nameMeta.error} />
      </Label>

      <Label tw="flex-grow" text="Mode" htmlFor={names.mode}>
        <ModeSelect {...mode} />
      </Label>

      <Label tw="flex-grow" text="Difficulty" htmlFor={names.difficulty}>
        <DifficultySelect {...difficulty} mode={mode.value} />
      </Label>
    </React.Fragment>
  );
};

export default GameMapFormEntry;
