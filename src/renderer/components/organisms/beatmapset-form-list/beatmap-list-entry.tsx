import 'twin.macro';
import React, { useMemo } from 'react';
import { useField } from 'formik';

import Input from '_/components/atoms/input';
import Label from '_/components/atoms/label';
import DifficultySelect from '_/components/molecules/difficulty-select';
import ModeSelect from '_/components/molecules/mode-select';
import Button from '_/components/atoms/button';

import Trash from '_/assets/icons/outline/trash.svg';
import { DIFFICULTIES, MODES } from '_/constants/beatmapset';

type Props = {
  index: number;
  onDelete?: () => void;
};

const BeatmapListEntry: React.FC<Props> = ({ onDelete, index }) => {
  const inputs = useMemo(
    () => ({
      name: `maps[${index}].name`,
      mode: `maps[${index}].mode`,
      difficulty: `maps[${index}].difficulty`,
    }),
    [index]
  );
  const [name, nameMeta] = useField<string>({
    name: inputs.name,
    type: 'text',
  });
  const [mode] = useField<MODES>({
    name: inputs.mode,
  });
  const [difficulty] = useField<DIFFICULTIES>({ name: inputs.difficulty });

  return (
    <React.Fragment>
      <Button
        magnitude="self-contained"
        tw="h-8 p-2"
        color="red"
        onClick={onDelete}
      >
        <Trash tw="h-4 w-4" />
      </Button>

      <Label tw="flex-grow" text="Name" htmlFor={`maps[${index}].name`}>
        <Input {...name} error={nameMeta.error} />
      </Label>

      <Label tw="flex-grow" text="Mode" htmlFor={inputs.mode}>
        <ModeSelect {...mode} />
      </Label>

      <Label tw="flex-grow" text="Difficulty" htmlFor={inputs.difficulty}>
        <DifficultySelect {...difficulty} mode={mode.value} />
      </Label>
    </React.Fragment>
  );
};

export default BeatmapListEntry;
